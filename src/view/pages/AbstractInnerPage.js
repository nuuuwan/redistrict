import { Component } from "react";

import AppColors from "../../view/_constants/AppColors";

export default class AbstractInnerPage extends Component {
  get color() {
    return AppColors.Light;
  }
}
