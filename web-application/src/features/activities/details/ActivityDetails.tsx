import React, { useContext, useEffect, Fragment } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { ActivityDetailInfo } from "./ActivityDetailInfo";
import { ActivityDetailChat } from "./ActivityDetailChat";
import { ActivityDetailSideBar } from "./ActivityDetailSideBar";
import ActivityDetailHeader from "./ActivityDetailHeader";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import { LoadingComponents } from '../../../app/layout/LoadingComponents';

interface IDetailsParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailsParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial) return <Fragment />; //<LoadingComponents content='Loading activities...' /></Fragment>

  if (!activity) {
    return <h2>Activity not found</h2>;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
