import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts.length > 0 &&
  alerts !== null &&
  alerts.map((alert) => (
    <div
      key={alert.id}
      className={`alert alert-${alert.alertType}`}
      style={{ fontWeight: "bold", borderRadius: "5px", textAlign: "center" }}
    >
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default memo(connect(mapStateToProps)(Alert));
