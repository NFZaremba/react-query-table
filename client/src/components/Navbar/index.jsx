import React from "react";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import ReactQueryIcon from "../../icons/ReactQueryIcon";

const StyledNavLink = styled(NavLink)`
  display: block;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-right: 1rem;
  padding-bottom: 0.5rem;
  text-align: center;
  text-decoration: none;
  width: 6rem;

  &.active {
    border-color: var(--chakra-colors-teal-500);
    border-bottom-width: 2px;
    font-weight: 700;
    color: var(--chakra-colors-teal-800);
  }
`;

const Navbar = () => {
  return (
    <Container as="nav" x="auto" maxW="container.lg" p="4">
      <Flex>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          as={Link}
          to="/"
          w="100%"
        >
          <ReactQueryIcon className="logo" />
          <Heading as={"h2"} color="teal" ml={4}>
            Custom React Query
          </Heading>
        </Box>
        <Flex>
          <StyledNavLink to="/" exact>
            Basic
          </StyledNavLink>
          <StyledNavLink to="/paginated">Paginated</StyledNavLink>
          <StyledNavLink to="/infinite">Infinite</StyledNavLink>
          <StyledNavLink to="/local">Local</StyledNavLink>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
