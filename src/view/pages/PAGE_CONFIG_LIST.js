import IDX from "../../nonview/base/IDX";

import CandidatePage from "../../view/pages/CandidatePage";
import CriteriaPage from "../../view/pages/CriteriaPage";

const PAGE_LIST = [CriteriaPage, CandidatePage];

const PAGE_CONFIG_LIST = PAGE_LIST.map(function (Page) {
  const pageInstance = new Page();

  return {
    Page,
    page: pageInstance.page,
    label: pageInstance.label,
    Icon: pageInstance.Icon,
    color: pageInstance.color,
  };
});

export default PAGE_CONFIG_LIST;

export const PAGE_CONFIG_IDX = IDX.build(
  PAGE_CONFIG_LIST,
  (x) => x.page,
  (x) => x
);

export const DEFAULT_PAGE_CONFIG = PAGE_CONFIG_IDX["CriteriaPage"];
