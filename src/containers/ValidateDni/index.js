import React, { useEffect, useState } from "react";
import {
    Grid,
    Heading,
    Icon,
    Button,
    Link,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalHeader,
    ModalCloseButton,
    Text,
    Image,
    ModalFooter,
    useDisclosure
} from "@chakra-ui/core";
import { WrapperContainer } from "../../components/layout";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import InputCustom from "../../components/InputCustom";
import * as Yup from "yup";

const ValidateDniContainer = () => {
    const history = useHistory();
    /*     const [showMoreInfo, setShowMoreInfo] = useState(false);
     */ const { isOpen, onOpen, onClose } = useDisclosure();

    /*     const onClose = () => setShowMoreInfo(false);
     */
    useEffect(() => {
        console.log("Validate dni");
    });

    const test = () => onOpen();

    const goBackHandler = e => {
        e.preventDefault();

        history.goBack();
    };

    const validator = Yup.object({
        dni: Yup.string()
            .matches(/^\d+$/, "Tu dni solo tiene numeros")
            .min(7, "Son al menos 7 digitos.")
            .required("El dni es requerido para saber quien eres 😕"),
            verificationCode: Yup.string()
            .matches(/^[0-9]$/, "El codigo de confirmacion solo tiene un numero")
            .min(1, "Es un numero.")
            .required(
                "El codigo de verificacion es requerido para saber que eres tu o alguien de tu entorno mas cercano."
            )
    });

    return (
        <>
            <WrapperContainer>
                <Link onClick={goBackHandler}>
                    <Icon name="arrow-back" size="32px" color="gray" />
                </Link>

                <Grid templateColumns="repeat(1, 1fr)" gap={4}>
                    <Heading as="h1" size="xl" color="#383838">
                        Validar Dni
                    </Heading>

                    <Formik
                        initialValues={{ dni: "", verificationCode: "" }}
                        validationSchema={validator}
                        onSubmit={async (values, { setSubmitting }) => {
                            const result = await (await fetch('http://localhost:4000/dev/verified-dni', {
                                method: 'POST',
                                body: JSON.stringify(values)
                            })).json();

                            console.log(result)

                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                                    <Grid templateColumns="repeat(1, 1fr)" gap={4}>

                                <InputCustom
                                    name="dni"
                                    placeholder="Dni"
                                />
                                <InputCustom
                                    name="verificationCode"
                                    placeholder="Codigo de validación"
                                    icon="question-outline"
                                    iconHandler={test}
                                    helperText="Jamas compartiremos tu dni."
                                />

                                <Button
                                    boxShadow="0px 3px 6px #00000014"
                                    variantColor="primary"
                                    color="primary.700"
                                    isLoading={isSubmitting}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Grid>
            </WrapperContainer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalBody>
                    <ModalHeader>Que es el coding de verificacion?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            Es un digito que se encuentro al costado del numero
                            del dni.
                        </Text>
                        {/* <Image
                            size="100px"
                            objectFit="cover"
                            src="https://bit.ly/sage-adebayo"
                            alt="Segun Adebayo"
                        /> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </>
    );
};

export default ValidateDniContainer;
