import { ContainerRockConfig, RockConfig, Rock, moveStyleUtils } from "@ruijs/move-style";
import { renderRock, renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import React, { useState } from "react";
import DesignerStore from "../DesignerStore";

export interface PropSetterProps extends ContainerRockConfig {
  $type: "propSetter",
  label: string;
  labelTip?: string;
  componentConfig: RockConfig;
  expressionPropName?: string;
}

export default {
  $type: "propSetter",

  renderer(props: PropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const [expIndicatorHovered, setExpIndicatorHovered] = useState(false);

    const { label, labelTip, componentConfig, expressionPropName } = props;
    const isPropDynamic = moveStyleUtils.isComponentPropertyDynamic(componentConfig, expressionPropName);

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "htmlElement",
      htmlTag: "div",
      style: styleSetter,
      children: [
        {
          $id: `${props.$id}-exp-indicator-container`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterExpIndicatorContainer,
          attributes: {
            onMouseEnter: () => setExpIndicatorHovered(true),
            onMouseLeave: () => setExpIndicatorHovered(false),
            onClick: () => {
              const store = page.getStore<DesignerStore>("designerStore");
              if (isPropDynamic) {
                store.page.removeComponentPropertyExpression(store.selectedComponentId, expressionPropName);
              } else {
                store.page.setComponentPropertyExpression(store.selectedComponentId, expressionPropName, "");
              }
            }
          },
          children: {
            $id: expIndicatorHovered && isPropDynamic ? `${props.$id}-exp-indicator-cancle` : `${props.$id}-exp-indicator-set`,
            $type: "antdIcon",
            name: expIndicatorHovered && isPropDynamic ? "CloseCircleOutlined" : "FunctionOutlined",
            style: {
              backgroundColor: expIndicatorHovered || isPropDynamic ? "#c038ff" : "#eeeeee",
              borderRadius: "100%",
            },
            color: "#ffffff",
          },
        },
        {
          $id: `${props.$id}-label-section`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterLabelSection,
          children: [
            {
              $id: `${props.$id}-label`,
              $type: "htmlElement",
              htmlTag: "div",
              style: styleSetterLabel,
              attributes: {
                title: label,
              },
              children: {
                $id: `${props.$id}-label-text`,
                $type: "text",
                text: label,
              }
            }
          ]
        },
        {
          $id: `${props.$id}-controls-wrapper`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterControls,
          children: props.children,
        },
      ],
    };

    return renderRock(framework, page, rockConfig);
  },

} as Rock;

const styleSetter: React.CSSProperties = {
  display: "flex",
  width: "260px",
  alignItems: "center",
  paddingBottom: "5px",
};

const styleSetterExpIndicatorContainer: React.CSSProperties = {
  width: "20px",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
}

const styleSetterLabelSection: React.CSSProperties = {
  width: "80px",
  minWidth: "80px",
  height: "30px",
  paddingRight: "5px",
  lineHeight: "30px",
}

const styleSetterLabel: React.CSSProperties = {
  display: "inline-block",
  width: "75px",
  textOverflow: "ellipsis",
  overflow: "hidden",
}

const styleSetterControls: React.CSSProperties = {
  width: "160px",
}