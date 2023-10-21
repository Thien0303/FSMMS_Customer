import React from "react";
import {
  Popover,
  List,
  ListItem,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  Divider,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useCart } from "../../Config/CartConText";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { NavLink } from "react-router-dom";

const CartPopup = ({ open, anchorEl, handleClose }) => {
  const { cart, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box p={2} width={400}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={handleClose} color="inherit">
            <Badge badgeContent={cart.length} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
        <List>
          {cart.map((product) => (
            <ListItem button key={product.name}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" alignItems="center">
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 50, marginRight: 10, objectFit: "cover" }}
                  />
                  <Typography variant="body1">{product.name}</Typography>
                </Box>
                <Typography variant="body2">
                  {product.quantity} x ${product.price.toFixed(2)}
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={() => removeFromCart(product.name)}
                  >
                    <HighlightOffRoundedIcon /> 
                  </IconButton>
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Subtotal:</Typography>
          <Typography variant="subtitle1">${calculateSubtotal().toFixed(2)}</Typography>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <NavLink to={"/cart"}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cart
          </Button>
          </NavLink>
          <NavLink to={"/checkout"}>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Checkout
          </Button>
          </NavLink>
        </Box>
      </Box>
    </Popover>
  );
};

export default CartPopup;
