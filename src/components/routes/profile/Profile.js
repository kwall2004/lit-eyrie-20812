import React from 'react';
import { Grid, Row, Col, ButtonToolbar, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import TimeZoneMap from '../../widgets/timeZoneMap';
import VehicleSettings from '../../widgets/vehicleSettings';
import { connect } from 'react-redux';
import * as settingsActions from '../../../store/actions/settings';

const Profile = React.createClass({
  render() {
    var dirtySettings = this.props.settings.get('list').filter(s => {
      return !s.get('VehicleId') && s.get('state');
    });

    return (
      <section>
        <div className="admin-header">
          <Grid>
            <div className="admin-header-left-column">
              <img src={'../../../public/images/admin-icons/Icon_Title_UserSetup.png'} />
              <div className="admin-header-title">
                <div className="admin-header-title-relative">
                  <div className="accent-description">
                    Profile
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-header-right-column">
              <ButtonToolbar>
                <Button
                  bsStyle="danger"
                  onClick={() => this.props.cancelSettings()}
                  disabled={dirtySettings.size == 0}
                  >
                  Cancel
                </Button>
                <Button
                  bsStyle="success"
                  onClick={() => this.props.saveSettings()}
                  disabled={dirtySettings.size == 0}
                  >
                  Save
                </Button>
              </ButtonToolbar>
            </div>
          </Grid>
        </div>

        <Grid>
          <h3>
            Home Time Zone
          </h3>
          <Alert bsStyle="success">
            The home time zone is used to display dates and times when no time zone is explicitly set for a vehicle. Vehicle specific time zones are set on the <Link to="/settings">settings</Link> page.
          </Alert>
          <span>
            <TimeZoneMap {...this.props} />
          </span>
          <span>
            <VehicleSettings />
          </span>
        </Grid>
      </section>
    )
  },
});

const Container = connect(
  (state) => {
    return {
      settings: state.settings
    };
  },
  Object.assign({},
    settingsActions)
)(Profile);

module.exports = Container;
