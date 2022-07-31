import { Component } from "react";
import React, { createRef } from "react";
import Box from "@mui/material/Box";

import AudioX from "../../nonview/base/AudioX";
import I18N from "../../nonview/base/I18N";
import URLContext from "../../nonview/base/URLContext";

import CustomAppBar from "../../view/molecules/CustomAppBar";
import HomePageBottomNavigation from "../../view/molecules/HomePageBottomNavigation";

import GroundTruth from "../../nonview/core/GroundTruth";
import PAGE_CONFIG_LIST, {
  DEFAULT_PAGE_CONFIG,
} from "../../view/pages/PAGE_CONFIG_LIST";

const STYLE_INNER_PAGE_BOX = {
  marginTop: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    const context = this.getContext();
    this.state = {
      context,
    };
    this.isComponentMounted = false;
    this.setContext(context);
  }

  getContext() {
    let context = URLContext.getContext();
    if (!context.page) {
      context.page = "CriteriaPage";
    }
    if (!context.lang) {
      context.lang = I18N.BASE_LANG;
    }
    if (!context.version) {
      context.version = GroundTruth.DEFAULT_VERSION;
    }

    if (!context.criterionWeights) {
      context.criterionWeights = GroundTruth.getInitCriterionWeights(
        context.version
      );
    }
    return context;
  }

  componentDidMount() {
    this.isComponentMounted = true;
  }

  setContext(newContext) {
    const oldContext = this.getContext();
    const context = { ...oldContext, ...newContext };

    URLContext.setContext(context);
    I18N.setLang(context.lang);

    if (this.isComponentMounted) {
      this.setState({ context });
    }
  }

  onClickOpenPage(page) {
    AudioX.playShort();
    let context = URLContext.getContext();
    context.page = page;
    this.setContext(context);
    window.scrollTo(0, 0);
  }

  getInnerPageConfig() {
    let { context } = this.state;

    for (let config of PAGE_CONFIG_LIST) {
      if (config.page === context.page) {
        context.page = config.page;
        URLContext.setContext(context);
        return config;
      }
    }

    context.page = DEFAULT_PAGE_CONFIG.page;
    URLContext.setContext(context);
    return DEFAULT_PAGE_CONFIG;
  }

  onChangeCriterionWeight(iCriterion, criterionWeight) {
    let context = this.getContext();
    let criterionWeights = context.criterionWeights;
    criterionWeights[iCriterion] = criterionWeight;
    context.criterionWeights = criterionWeights;
    this.setContext(context);
  }

  onChangeVersion(version) {
    let context = this.getContext();
    context.version = version;

    context.criterionWeights = GroundTruth.getInitCriterionWeights(
      context.version
    );
    context.page = "CriteriaPage";
    this.setContext(context);
  }

  onClickRandomCriteriaWeights() {
    AudioX.playLong();
    let context = this.getContext();
    context.criterionWeights = GroundTruth.getRandomCriterionWeights(
      context.version
    );
    this.setContext(context);
  }

  render() {
    const { context } = this.state;
    const key = JSON.stringify(context);
    const innerPageConfig = this.getInnerPageConfig();
    const criterionWeights = context.criterionWeights;
    const refHomePage = createRef(null);

    return (
      <Box key={key}>
        <CustomAppBar
          title={innerPageConfig.label}
          color={innerPageConfig.color}
          Icon={innerPageConfig.Icon}
          context={context}
          onChangeVersion={this.onChangeVersion.bind(this)}
          onClickOpenPage={this.onClickOpenPage.bind(this)}
        />
        <Box sx={STYLE_INNER_PAGE_BOX}>
          <innerPageConfig.Page
            refHomePage={refHomePage}
            context={context}
            onClickOpenPage={this.onClickOpenPage.bind(this)}
            criterionWeights={criterionWeights}
            onChangeCriterionWeight={this.onChangeCriterionWeight.bind(this)}
            onChangeVersion={this.onChangeVersion.bind(this)}
          />
        </Box>
        <HomePageBottomNavigation
          onClickOpenPage={this.onClickOpenPage.bind(this)}
          refHomePage={refHomePage}
          onClickRandomCriteriaWeights={this.onClickRandomCriteriaWeights.bind(
            this
          )}
        />
      </Box>
    );
  }
}
