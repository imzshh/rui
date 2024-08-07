import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandlerScript, Rock, RockEventHandlerConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useCallback } from "react";

export interface ExpressionSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandlerConfig;
  onBlur?: RockEventHandlerConfig;
}

export default {
  $type: "expressionSetterInput",

  Renderer(context, props: ExpressionSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, onChange } = props;

    const onInputChange: RockEventHandlerScript["script"] = useCallback(
      (event: RockEvent) => {
        const value = event.args[0].target.value;
        handleComponentEvent("onChange", framework, page, scope, props, onChange, [value]);
      },
      [page, $id, onChange],
    );

    const rockConfig: RockConfig = {
      $id: `${props.$id}-internal`,
      $type: "antdInput",
      value: props.value,
      style: {
        backgroundColor: "#c038ff",
        color: "#ffffff",
      },
      onChange: {
        $action: "script",
        script: onInputChange,
      },
      onBlur: props.onBlur,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;
