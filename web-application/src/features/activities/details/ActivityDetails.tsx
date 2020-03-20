import React, { useContext, useEffect, Fragment } from "react";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { ActivityDetailInfo } from "./ActivityDetailInfo";
import { ActivityDetailChat } from "./ActivityDetailChat";
import { ActivityDetailSideBar } from "./ActivityDetailSideBar";
import ActivityDetailHeader from "./ActivityDetailHeader";
// import { LoadingComponents } from '../../../app/layout/LoadingComponents';

interface IDetailsParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailsParams>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity) return <Fragment />; //<LoadingComponents content='Loading activities...' /></Fragment>

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity}/>
        <ActivityDetailInfo activity={activity}/>
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSideBar/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
