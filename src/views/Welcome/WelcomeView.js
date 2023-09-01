import { Grid } from '@mui/material';
import { AppLink, AppIcon } from '../../components';
import FinalMessage from '../../components/FinalMessage';
import ButtonsSection from '../components/Buttons';
import TagsSection from '../components/Tags';
import TypographySection from '../components/Typography';
import IconButtonsSection from '../components/IconButtons';
import AlertsSection from '../components/Alerts';
import TimerLog from './timerLog';

/**
 * Renders Welcome page/view
 * Url: /welcome and /
 */
const WelcomeView = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FinalMessage title="Welcome to _TITLE_">
          <p>
            <TimerLog />
          </p>
          <p>
            This <AppLink href="https://react.dev/">React</AppLink> application is built using{' '}
            <AppLink href="https://mui.com/">Material UI</AppLink> components.
          </p>
          <p>
            The project is <AppLink href="https://github.com/karpolan/react-mui-pro-starter">Open Source</AppLink> and
            contains lots of useful components and utilities.
          </p>
          <p>
            Everyone can use the source code as a{' '}
            <AppLink href="https://github.com/karpolan/react-mui-pro-starter/blob/main/README.md">
              starter for new React project
            </AppLink>
            . Any{' '}
            <AppLink href="https://github.com/karpolan/react-mui-pro-starter/issues">comments and suggestions</AppLink>{' '}
            are welcome <AppIcon name="smile" />
          </p>
        </FinalMessage>
      </Grid>
      <Grid item xs={12} sm={12}>
        <ul>Coal Unload</ul>
        <ul>Coal Rent</ul>
        <ul>Coal Lend</ul>
        <ul>Bhata fill coal</ul>
        <ul>Bhata fill store</ul>
        <ul>Bhata fill labour</ul>
        <ul>Bhata fill time</ul>
        <ul>Bhata pull lime</ul>
        <ul>Bhata pull guli</ul>
        <ul>Bhata pull chuna</ul>
        <ul>Bhata pull labour</ul>
        <ul>Bhata pull time</ul>
        <ul>Lime sell</ul>
        <ul>Stone unload</ul>
        <ul>Stone unload chat</ul>
        <ul>Stone rent</ul>
        <ul>Stone lend</ul>
        <ul>Bhata elictricity bill </ul>
        <ul>Bhata gas bill </ul>
        <ul>Bhata gas bill labour </ul>
        <ul>Bhata grocesary </ul>
        <ul>Bhata generater oil </ul>
        <ul>Bhata tractor oil </ul>
        <ul>Bhata bike oil </ul>
        <ul>Bhata bike maintaince </ul>
        <ul>Bhata tractor maintaince </ul>
        <ul>Bhata maintenance </ul>
        <ul>Coal stone loader </ul>
        <ul>Coal store dumper </ul>
        <ul>Bhata maintaince electrician </ul>
        <ul>Bhata maintaince construction </ul>
        <ul>Bill tree</ul>
        <ul>Bill tree</ul>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TypographySection />
      </Grid>

      <Grid item xs={12} sm={6}>
        <ButtonsSection />
        <br />
        <IconButtonsSection />
        <br />
        <TagsSection />
        <br />
        <AlertsSection />
      </Grid>
    </Grid>
  );
};

export default WelcomeView;
