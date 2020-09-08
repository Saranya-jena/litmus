import { useQuery } from '@apollo/client';
import { Button, Card, CardActionArea, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InfoFilledWrap from '../../components/InfoFilled';
import Loader from '../../components/Loader';
import QuickActionCard from '../../components/QuickActionCard';
import WelcomeModal from '../../components/WelcomeModal';
import Scaffold from '../../containers/layouts/Scaffold';
import { GET_USER } from '../../graphql';
import {
  CurrentUserDedtailsVars,
  CurrentUserDetails,
  Member,
  Project,
} from '../../models/graphql/user';
import useActions from '../../redux/actions';
import * as UserActions from '../../redux/actions/user';
import { RootState } from '../../redux/reducers';
import useStyles from './style';

const CreateWorkflowCard = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const routeChange = () => {
    history.push('/create-workflow');
  };
  return (
    <Card
      elevation={3}
      className={classes.createWorkflowCard}
      onClick={() => {
        routeChange();
      }}
      data-cy="createWorkflow"
    >
      <CardActionArea>
        <Typography className={classes.createWorkflowHeading}>
          {t('home.workflow.heading')}
        </Typography>
        <Typography className={classes.createWorkflowTitle}>
          {t('home.workflow.info')}
        </Typography>
        <ArrowForwardIcon className={classes.arrowForwardIcon} />
      </CardActionArea>
    </Card>
  );
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { userData } = useSelector((state: RootState) => state);
  const classes = useStyles();
  const { t } = useTranslation();
  const user = useActions(UserActions);

  // Query to get user details
  const { data, loading } = useQuery<
    CurrentUserDetails,
    CurrentUserDedtailsVars
  >(GET_USER, {
    variables: { username: userData.username },
  });

  const name: string = data?.getUser.name ?? '';

  const handleModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (data?.getUser.username === userData.username) {
      setIsOpen(false);
      let isOwnerOfProjectID: string = '';
      const projectList: Project[] = data?.getUser.projects;
      projectList.forEach((project) => {
        const memberList: Member[] = project.members;
        memberList.forEach((member) => {
          if (
            member.user_name === data?.getUser.username &&
            member.role === 'Owner'
          ) {
            isOwnerOfProjectID = project.id;
          }
        });
      });
      user.updateUserDetails({
        selectedProjectID: isOwnerOfProjectID,
      });
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Scaffold>
          {isOpen ? <WelcomeModal handleIsOpen={handleModal} /> : <></>}
          <div className={classes.rootContainer}>
            <div className={classes.root}>
              <Typography className={classes.userName}>
                {t('home.heading')}
                <strong>{name}</strong>
              </Typography>
              <div className={classes.headingDiv}>
                <div className={classes.mainDiv}>
                  <div>
                    <Typography className={classes.mainHeading}>
                      <strong>{t('home.subHeading1')}</strong>
                    </Typography>
                    <Typography className={classes.mainResult}>
                      <strong>{t('home.subHeading2')}</strong>
                    </Typography>
                    <Typography className={classes.mainDesc}>
                      {t('home.subHeading3')}
                    </Typography>
                    <Button
                      variant="contained"
                      className={classes.predefinedBtn}
                    >
                      <Typography variant="subtitle1">
                        {t('home.button1')}
                      </Typography>
                    </Button>
                  </div>
                  <div className={classes.imageDiv}>
                    <img src="icons/applause.png" alt="Applause icon" />
                  </div>
                </div>
                <div>
                  <CreateWorkflowCard data-cy="CreateWorkflowCard" />
                </div>
              </div>
              <div className={classes.contentDiv}>
                <div className={classes.statDiv}>
                  <div className={classes.btnHeaderDiv}>
                    <Typography className={classes.statsHeading}>
                      <strong>{t('home.analytics.heading')}</strong>
                    </Typography>
                    <Button className={classes.seeAllBtn}>
                      <div className={classes.btnSpan}>
                        <Typography className={classes.btnText}>
                          {t('home.analytics.moreInfo')}
                        </Typography>
                        <img src="icons/next.png" alt="next" />
                      </div>
                    </Button>
                  </div>
                  <div className={classes.cardDiv}>
                    <InfoFilledWrap />
                  </div>
                </div>
                <div className={classes.quickActionDiv}>
                  <QuickActionCard />
                </div>
              </div>
            </div>
          </div>
        </Scaffold>
      )}
    </div>
  );
};

export default HomePage;
