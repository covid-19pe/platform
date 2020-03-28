import React, { useEffect } from "react";
import { Grid } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";

import { WrapperContainer } from "../../components/layout";
import { Button, Heading, Alert, AlertIcon } from "@chakra-ui/core";
import styled from "@emotion/styled";

const ContentContainer = styled.div`
    position: absolute;
    bottom: ${props => (props.position === "bottom" ? 0 : "auto")};
    top: ${props => (props.position === "top" ? 0 : "auto")};
    width: 100%;
`;

const GraphContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: ${props => (!props.images ? "none" : "block")};
    background-image: ${props =>
        props.images.map(
            (image, i) =>
                `url(${image})${i === props.images.length - 1 ? "" : ","}`
        )};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 120%, 100%;
`;

const HomeContainer = () => {
  const history = useHistory();

  useEffect(() => {
    console.log('Home')
  })


    const handlerStarClick = (e) => {
      e.preventDefault();

      history.push('/validar-dni');
    }
    return (
        <>
            <ContentContainer position="top">
                <WrapperContainer>
                    <Alert
                        status="info"
                        fontSize="xs"
                        backgroundColor="gray.200"
                        color="gray.500"
                        borderRadius=".5rem"
                    >
                        <AlertIcon size="1rem" color="gray.400" />
                        Esta información sera publica sin saber el origen de la
                        misma y ayudara a algunas personas a verificar si han
                        estado en los mismo lugares que las personas
                        contagiadas.
                    </Alert>
                </WrapperContainer>
            </ContentContainer>

            <GraphContainer
                images={[
                    "assets/graphics/home.svg",
                    "assets/graphics/home-corona.svg"
                ]}
            />
            <ContentContainer position="bottom">
                <WrapperContainer>
                    <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                        <Heading as="h1" size="2xl" width="80%" color="#383838">
                            ¿Cómo saber si tengo coronavirus?
                        </Heading>

                        <Button
                            loadingText="Loading..."
                            boxShadow="0px 3px 6px #00000014"
                            variantColor="primary"
                            color="primary.700"
                            onClick={handlerStarClick}
                        >
                            Tengo sintomas
                        </Button>

                        <Button
                            variant="outline"
                            border="2px"
                            borderColor="primary.700"
                            color="primary.700"
                        >
                            Actualizar mis sintomas
                        </Button>
                    </Grid>
                </WrapperContainer>
            </ContentContainer>
        </>
    );
};

export default HomeContainer;
