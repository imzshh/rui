export { default as DesignerStore} from "./DesignerStore";

import ComponentPropertiesPanel from "./rocks/component-properties-panel";
import ComponentTree from "./rocks/component-tree";
import PropSetter from "./rocks/PropSetter";
import Toolbox from "./rocks/toolbox";

// prop panels
import AppearancePropPanel from "./prop-panels/AppearancePropPanel";
import ComponentPropPanel from "./prop-panels/ComponentPropPanel";
import PositionPropPanel from "./prop-panels/PositionPropPanel";
import SizePropPanel from "./prop-panels/SizePropPanel";
import TextPropPanel from "./prop-panels/TextPropPanel";

// internal prop setters
import ExpressionPropSetter from "./internal-prop-setters/ExpressionPropSetter";
import MultiControlsPropSetter from "./internal-prop-setters/MultiControlsPropSetter";
import SingleControlPropSetter from "./internal-prop-setters/SingleControlPropSetter";

// prop setters
import NumberPropSetter from "./prop-setters/NumberPropSetter";
import NumberWithUnitsPropSetter from "./prop-setters/NumberWithUnitsPropSetter";
import SelectPropSetter from "./prop-setters/SelectPropSetter";
import SwitchPropSetter from "./prop-setters/SwitchPropSetter";
import TextPropSetter from "./prop-setters/TextPropSetter";

// setter inputs
import ExpressionSetterInput from "./setter-input-controls/ExpressionSetterInput";
import NumberSetterInput from "./setter-input-controls/NumberSetterInput";
import SelectSetterInput from "./setter-input-controls/SelectSetterInput";
import SliderSetterInput from "./setter-input-controls/SliderSetterInput";
import SwitchSetterInput from "./setter-input-controls/SwitchSetterInput";
import TextSetterInput from "./setter-input-controls/TextSetterInput";

export const Rocks = {
  ComponentPropertiesPanel,
  ComponentTree,
  PropSetter,
  Toolbox,

  // prop panels
  AppearancePropPanel,
  ComponentPropPanel,
  PositionPropPanel,
  SizePropPanel,
  TextPropPanel,

  // internal prop setters
  ExpressionPropSetter,
  MultiControlsPropSetter,
  SingleControlPropSetter,

  // prop setters
  NumberPropSetter,
  NumberWithUnitsPropSetter,
  SelectPropSetter,
  SwitchPropSetter,
  TextPropSetter,

  // setter inputs
  ExpressionSetterInput,
  NumberSetterInput,
  SelectSetterInput,
  SliderSetterInput,
  SwitchSetterInput,
  TextSetterInput,
};