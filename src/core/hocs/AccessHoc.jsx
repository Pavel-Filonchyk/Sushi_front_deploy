import PropTypes from 'prop-types';
import { useUidmSSO } from 'uidm-react-lib';

import { EMPLOYEE_ROLES, ROUTES } from './../../common/constants';
import ErrorInfo from './../../components/ErrorInfo';

const isAllowedFor = (params = {}) => {
  const { currentRoles = [], allowedFor = [] } = params;

  return allowedFor.some((allowedRole) => currentRoles.includes(allowedRole));
};

const hasOnlyPartnerConfirmedRole = (roles = []) => roles.includes(EMPLOYEE_ROLES.PARTNER_CONFIRMED)
  && !roles.includes(EMPLOYEE_ROLES.BANK_ACCOUNT_MANAGER)
  && !roles.includes(EMPLOYEE_ROLES.BANK_PRODUCT_MANAGER)
  && !roles.includes(EMPLOYEE_ROLES.BANK_TOP_MANAGER)
  && !roles.includes(EMPLOYEE_ROLES.BANK_ADMIN);

const getMainPageUrl = ({ roles = [], userUuid } = {}) => {

  return ROUTES.BASE;
};

const AccessHoc = ({ children, allowedFor, disabledFor, showError }) => {
  const {
    sso: { userData = {} }
  } = useUidmSSO();
  const disabledContent = showError ? <ErrorInfo /> : null;
  const isDisabled = isAllowedFor({ currentRoles: userData?.roles, allowedFor: disabledFor });
  const isOnlyDisabledFor = !allowedFor.length && disabledFor.length;

  if (disabledFor.length && isDisabled) {
    return disabledContent;
  }

  if (isOnlyDisabledFor || isAllowedFor({ currentRoles: userData?.roles, allowedFor })) {
    return children;
  }

  return disabledContent;
};

AccessHoc.propTypes = {
  children: PropTypes.node.isRequired,
  allowedFor: PropTypes.arrayOf(PropTypes.string),
  disabledFor: PropTypes.arrayOf(PropTypes.string),
  showError: PropTypes.bool
};

AccessHoc.defaultProps = {
  allowedFor: [],
  disabledFor: [],
  showError: false
};

export { AccessHoc, isAllowedFor, getMainPageUrl, hasOnlyPartnerConfirmedRole };
