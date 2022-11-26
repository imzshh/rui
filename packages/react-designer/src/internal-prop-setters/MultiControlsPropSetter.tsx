import { ContainerRockConfig, MultiControlsRockPropSetter, RockConfig, RockEvent, RockEventHandlerScript, Rock } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { PropSetterProps } from "../rocks/PropSetter";

export interface MultiControlsPropSetterProps extends MultiControlsRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "multiControlsPropSetter",

  renderer(props: MultiControlsPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, controls, componentConfig, expressionPropName } = props;

    const controlRocks: RockConfig[] = useMemo(() => {
      let rowNum = 1;
      let colNum = 1;
      let inputNum = 1;

      const rowRocks: RockConfig[] = [];
      let currentRowRock: ContainerRockConfig;

      for (const control of controls) {
        const { control: inputControlRockConfig, propName, span = 2 } = control;
        inputControlRockConfig.$id = `${$id}-input-${inputNum}`;
        if (propName) {
          inputControlRockConfig.value = componentConfig[propName];

          const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
            const value = event.args;
            const store = page.getStore<DesignerStore>("designerStore");
            store.page.setComponentProperty(store.selectedComponentId, propName, value);
          };

          inputControlRockConfig.onChange = {
            $action: "script",
            script: onInputControlChange,
          };
        }

        if (getFreeSpace(currentRowRock) < span) {
          currentRowRock = {
            $id: `${$id}-row-${rowNum}`,
            $type: "antdRow",
            gutter: 10,
            children: [],
          };
          rowRocks.push(currentRowRock);
          colNum = 1;
        }

        currentRowRock.children.push({
          $id: `${$id}-row-${rowNum}-${colNum}`,
          $type: "antdCol",
          span: span * 12,
          children: inputControlRockConfig,
        } as RockConfig);
        colNum ++;
      }

      return rowRocks;
    }, [controls, componentConfig]);

    const setterRock: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: expressionPropName,
      componentConfig,
      children: controlRocks,
    };

    return renderRock(framework, page, setterRock);
  },
} as Rock;

function getFreeSpace(rowRock: ContainerRockConfig) {
  if (!rowRock) {
    return 0;
  }

  let usedSpace = 0;
  const children = rowRock.children;
  if (Array.isArray(children)) {
    children.forEach((child) => {
      usedSpace += child.span / 12;
    });
  } else {
      usedSpace += children.span / 12;
  }

  return 2 - usedSpace;
}