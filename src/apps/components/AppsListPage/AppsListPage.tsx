import Container from "@saleor/components/Container";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import { ListProps } from "@saleor/types";
import React from "react";
import { useIntl } from "react-intl";

import { AppDelete } from "../../types/AppDelete";
import { AppsInstallations } from "../../types/AppsInstallations";
import { AppsList_apps_edges } from "../../types/AppsList";
import AppsInProgress from "../AppsInProgress/AppsInProgress";
import CustomApps from "../CustomApps/CustomApps";
import InstalledApps from "../InstalledApps/InstalledApps";
import Marketplace from "../Marketplace";

export interface AppsListPageProps extends ListProps {
  installedAppsList: AppsList_apps_edges[];
  customAppsList: AppsList_apps_edges[];
  appsInProgressList?: AppsInstallations;
  loadingAppsInProgress: boolean;
  handleRemoveConfirm: () => void;
  navigateToCustomApp: (id: string) => () => void;
  onInstalledAppRemove: (id: string) => void;
  onCustomAppRemove: (id: string) => void;
  onAppRemove: (data: AppDelete) => void;
  onAppInstallRetry: (id: string) => void;
}

const AppsListPage: React.FC<AppsListPageProps> = ({
  appsInProgressList,
  customAppsList,
  installedAppsList,
  loadingAppsInProgress,
  handleRemoveConfirm,
  navigateToCustomApp,
  onInstalledAppRemove,
  onCustomAppRemove,
  onAppRemove,
  onAppInstallRetry,
  ...listProps
}) => {
  const intl = useIntl();

  const appsInProgress = appsInProgressList?.appsInstallations;

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.apps)} />
      {!!appsInProgress?.length && (
        <AppsInProgress
          appsList={appsInProgress}
          disabled={loadingAppsInProgress}
          onAppInstallRetry={onAppInstallRetry}
        />
      )}
      <InstalledApps
        appsList={installedAppsList}
        onRemove={onInstalledAppRemove}
        {...listProps}
      />
      <CustomApps
        appsList={customAppsList}
        navigateToCustomApp={navigateToCustomApp}
        onRemove={onCustomAppRemove}
      />
      <Marketplace />
    </Container>
  );
};

AppsListPage.displayName = "AppsListPage";
export default AppsListPage;
