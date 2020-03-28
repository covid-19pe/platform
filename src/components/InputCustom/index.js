import React from "react";
import { useField } from "formik";
import {
    Input,
    FormErrorMessage,
    FormControl,
    InputGroup,
    InputRightElement,
    Icon,
    FormHelperText
} from "@chakra-ui/core";
import styled from "@emotion/styled";

const WrapperInputContainer = styled.div`
/*     margin-bottom: ${props => props.theme.space[4]};
 */`;

const InputCustom = ({ iconHandler, ...props }) => {
    const [field, meta] = useField(props.name);

    return (
        <WrapperInputContainer>
            <FormControl isInvalid={meta.error}>
                {!props.icon ? (
                    <>
                        <Input
                            {...field}
                            {...props}
                            variant="filled"
                            focusBorderColor="primary.500"
                        />
                        {props.helperText && (
                            <FormHelperText id="email-helper-text">
                                {props.helperText}
                            </FormHelperText>
                        )}
                    </>
                ) : (
                    <InputGroup>
                        <Input
                            {...field}
                            {...props}
                            variant="filled"
                            focusBorderColor="primary.500"
                        />
                        <InputRightElement
                            children={
                                <Icon
                                    name={props.icon}
                                    color="gray-500"
                                    onClick={iconHandler}
                                />
                            }
                        />
                    </InputGroup>
                )}
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        </WrapperInputContainer>
    );
};

export default InputCustom;
