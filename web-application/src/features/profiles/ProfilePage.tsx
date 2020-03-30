import React, { useContext, useEffect, Fragment } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import { ProfileContent } from "./ProfileContent";
import { RootStoreContext } from "../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponents } from "../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";

interface RootParams {
  username: string;
}
interface IProps extends RouteComponentProps<RootParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProfile, profile, loadingProfile } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <Fragment />; //<LoadingComponents content="Loading profile..."/>

  return (
    <Grid>
      <GridColumn width={16}>
        <ProfileHeader profile={profile!} />
        <ProfileContent />
      </GridColumn>
    </Grid>
  );
};

export default observer(ProfilePage);
