import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  Select,
  SubmitButton,
} from "./Common";
import { LoginContext } from "./LoginContext";

export function SignUpForm(props) {
  const { PindahkeLogin } = useContext(LoginContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Username" />
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Select>
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </Select>
        <Input type="text" value="user" hidden readonly />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <SubmitButton type="submit">Sign Up </SubmitButton>
      <MutedLink href="#">
        Memiliki Akun ?
        <BoldLink href="#" onClick={PindahkeLogin}>
          Login
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
