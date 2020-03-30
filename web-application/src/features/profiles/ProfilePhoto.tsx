import React, { useContext, useState } from "react";
import {
  TabPane,
  Header,
  CardGroup,
  Card,
  Image,
  Button,
  Grid,
  GridColumn,
  ButtonGroup
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import PhotoUploadWidget from "../../app/common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhoto = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    loading,
    deletePhoto
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState<string | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
    undefined
  );

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploadingPhoto}
            />
          ) : (
            <CardGroup itemsPerRow={5}>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <ButtonGroup fluid widths={2}>
                        <Button
                          name={photo.id}
                          basic
                          positive
                          content="Main"
                          loading={loading && target === photo.id}
                          disabled={photo.isMain}
                          onClick={e => {
                            setMainPhoto(photo);
                            setTarget(e.currentTarget.name);
                          }}
                        />
                        <Button
                          basic
                          name={photo.id}
                          disabled={photo.isMain}
                          negative
                          icon="trash"
                          onClick={e => {
                            deletePhoto(photo);
                            setDeleteTarget(e.currentTarget.name);
                          }}
                          loading={loading && deleteTarget === photo.id}
                        />
                      </ButtonGroup>
                    )}
                  </Card>
                ))}
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
};

export default observer(ProfilePhoto);
