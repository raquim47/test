import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>
          <img src={process.env.PUBLIC_URL + "/logo.png"} width="100px" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/Cart')}} href="#pricing">Cart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default TopNav;