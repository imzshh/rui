import { RockConfig, RockEvent, RockEventHandlerScript, RockMeta, ExpressionRockPropSetter } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";
import { PropSetterProps } from "../rocks/PropSetter";

export interface ExpressionPropSetterProps extends ExpressionRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "expressionPropSetter",

  renderer(props: ExpressionPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { propName, componentConfig } = props;

    const controlRock: RockConfig = useMemo(() => {
      const inputControlRockConfig: RockConfig = {
        $type: "expressionSetterInput",
      };
      inputControlRockConfig.$id = `${props.$id}-setterControl-${propName}`;
      inputControlRockConfig.value = componentConfig.$exps?.[propName];

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const propertyExp = event.args;
        const store = page.getStore<DesignerStore>("designerStore");
        store.page.setComponentPropertyExpression(store.selectedComponentId, propName, propertyExp);
      };

      inputControlRockConfig.onChange = {
        $action: "script",
        script: onInputControlChange,
      };
      return {
        $id: `${inputControlRockConfig.$id}-wrap`,
        $type: "htmlElement",
        htmlTag: "div",
        children: inputControlRockConfig,
      } as RockConfig;
    }, [componentConfig]);

    const setterRock: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: propName,
      componentConfig,
      children: controlRock,
    };

    return renderRock(framework, page, setterRock);
  },
} as RockMeta;