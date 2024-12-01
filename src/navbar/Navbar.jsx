import React from 'react';
import { FaSignOutAlt, FaSearch, FaShoppingCart, FaCreditCard } from 'react-icons/fa';
import {
  StyledNavbar,
  StyledNavLink,
  StyledContainer,
  StyledForm,
  StyledSearchInput
} from './Navbar-style.jsx';
import logo from '../assets/download.svg';
import { useTenant } from '../contexts/TenantContext';

function Navbarr() {
  const { tenantInfo } = useTenant();

  return (
    <StyledNavbar expand="lg" className="fixed-top">
      <StyledContainer fluid>
        <StyledNavbar.Brand href="#">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {tenantInfo && tenantInfo.logoUrl ? (
                <img
                  src={tenantInfo.logoUrl}
                  alt={`${tenantInfo.tenantId} logo`}
                  style={{ height: '40px', marginRight: '10px' }}
                />
              ) : (
                <img src={logo} alt="Default Logo" style={{ height: '40px', marginRight: '10px' }} />
              )}
            </div>
        </StyledNavbar.Brand>

        <StyledForm>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FaSearch
              onClick={() => window.location.href = '/products'}
              style={{
                position: 'absolute',
                left: '10px',
                cursor: 'pointer',
                color: '#558c8c'
              }}
            />
            <StyledSearchInput
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ paddingLeft: '40px' }} 
            />
          </div>
        </StyledForm>

        <StyledNavLink href="/orders">
            <FaShoppingCart size={22} style={{ marginRight: '8px' }} />
            Orders
        </StyledNavLink>

        <StyledNavLink href="/payments">
          <FaCreditCard size={22} style={{ marginRight: '8px' }} />
          Payments
        </StyledNavLink>

        <StyledNavLink href="/">
          <FaSignOutAlt size={22} style={{ marginRight: '8px' }} />
          Exit
        </StyledNavLink>

      </StyledContainer>
    </StyledNavbar>
  );
}

export default Navbarr;
