import { get, isNull, isObject, isString, isUndefined, merge, set } from "lodash";
import { GetStringResourceConfig, Lingual, LocaleNamespace, LocaleResource } from "~/types/locale-types";
import { fulfillVariablesInString } from "./variable-fulfiller";
import { Framework } from "~/Framework";
import { RuiLogger } from "@ruiapp/log";

export function loadLocaleResources(
  localesStore: Map<LocaleNamespace, Map<Lingual, LocaleResource>>,
  ns: string,
  localeResources: Record<string, LocaleResource>,
) {
  for (const lingual in localeResources) {
    const localeResourceToLoad = localeResources[lingual];

    let localeResourcesOfNs = localesStore.get(ns);
    if (!localeResourcesOfNs) {
      localeResourcesOfNs = new Map();
      localesStore.set(ns, localeResourcesOfNs);
    }

    let localeResource = localeResourcesOfNs.get(lingual);
    if (!localeResource) {
      localeResource = {
        translation: {},
      };
      localeResourcesOfNs.set(lingual, localeResource);
    }

    merge(localeResource.translation, localeResourceToLoad.translation);
  }
}

export function hasLocaleStringResource(
  localesStore: Map<LocaleNamespace, Map<Lingual, LocaleResource>>,
  lingual: string,
  ns: string | GetStringResourceConfig,
  name?: string,
): boolean {
  if (arguments.length === 3) {
    if (isObject(ns)) {
      name = ns.name;
      ns = ns.ns;
    } else {
      name = ns;
      ns = "default";
    }
  } else if (arguments.length === 4) {
    if (isString(ns) && isObject(name)) {
      name = ns;
      ns = "default";
    }
  }

  if (!ns) {
    ns = "default";
  }

  let localeResourceOfNs = localesStore.get(ns as string);
  if (!localeResourceOfNs) {
    return false;
  }

  let localeResourcesOfLingual = localeResourceOfNs.get(lingual);
  if (!localeResourcesOfLingual) {
    return false;
  }

  const sr = get(localeResourcesOfLingual.translation, name);
  if (!sr) {
    return false;
  }
  if (isObject(sr)) {
    throw new Error("String resource should be a text string. Check the 'name' parameter.");
  }

  return true;
}

export function getLocaleStringResource(
  localesStore: Map<LocaleNamespace, Map<Lingual, LocaleResource>>,
  lingual: string,
  fallbackLingual: string | null | undefined,
  ns: string | GetStringResourceConfig,
  name?: string,
  params?: Record<string, any>,
): string {
  if (arguments.length === 4) {
    if (isObject(ns)) {
      params = ns.params;
      name = ns.name;
      ns = ns.ns;
    } else {
      name = ns;
      ns = "default";
    }
  } else if (arguments.length === 5) {
    if (isString(ns) && isObject(name)) {
      params = name;
      name = ns;
      ns = "default";
    }
  }

  if (!ns) {
    ns = "default";
  }

  let localeResourceOfNs = localesStore.get(ns as string);
  if (!localeResourceOfNs) {
    return `${ns}:${name}`;
  }

  let localeResourcesOfLingual = localeResourceOfNs.get(lingual);
  if (!localeResourcesOfLingual) {
    localeResourcesOfLingual = localeResourceOfNs.get(fallbackLingual);
  }

  if (!localeResourcesOfLingual) {
    return `${ns}:${name}`;
  }

  const sr = get(localeResourcesOfLingual.translation, name);
  if (!sr) {
    return `${ns}:${name}`;
  }
  if (isObject(sr)) {
    throw new Error("String resource should be a text string. Check the 'name' parameter.");
  }

  if (!params) {
    return sr;
  }

  return fulfillVariablesInString(sr, params);
}

export function localizeConfigProps(framework: Framework, logger: RuiLogger, config: Record<string, any>) {
  let i18n = config.$i18n;
  if (i18n) {
    for (const propName in i18n) {
      let getSrConfig = i18n[propName];
      if (isUndefined(getSrConfig) || isNull(getSrConfig)) {
        continue;
      }

      if (isString(getSrConfig)) {
        getSrConfig = {
          name: getSrConfig,
        };
      }

      const hasLocaleStringResource = framework.hasLocaleStringResource(getSrConfig);
      if (hasLocaleStringResource) {
        set(config, propName, framework.getLocaleStringResource(getSrConfig));
      }
    }
  }

  let locales = config.$locales;
  if (locales) {
    for (const propName in locales) {
      if (propName.startsWith("$")) {
        logger.error(`Can not set locale text to system field "${propName}".`);
        continue;
      }

      const propLocales = locales[propName];
      let resourceOfLingual = propLocales[framework.getLingual()];
      if (!resourceOfLingual) {
        resourceOfLingual = propLocales[framework.getFallbackLingual()];
      }
      if (resourceOfLingual) {
        set(config, propName, resourceOfLingual);
      }
    }
  }
}
