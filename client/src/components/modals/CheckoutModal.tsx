import ButtonModal from "./ButtonModal";
import {
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";

function CheckoutModal() {
  type TestCreditCard = {
    name: string;
    number: number;
    cvv: string;
    date: string;
  };

  const creditCards: TestCreditCard[] = [
    {
      name: "Visa",
      number: 4242424242424242,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Visa (debit)",
      number: 4000056655665556,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Mastercard",
      number: 5555555555554444,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Mastercard (2-series)",
      number: 2223003122003222,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Mastercard (debit)",
      number: 5200828282828210,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Mastercard (prepaid)",
      number: 5105105105105100,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "American Express",
      number: 378282246310005,
      cvv: "Any 4 digits",
      date: "Any future date",
    },
    {
      name: "American Express",
      number: 371449635398431,
      cvv: "Any 4 digits",
      date: "Any future date",
    },
    {
      name: "Discover",
      number: 6011111111111117,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Discover",
      number: 6011000990139424,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
    {
      name: "Discover (debit)",
      number: 6011981111111113,
      cvv: "Any 3 digits",
      date: "Any future date",
    },
  ];

  return (
    <ButtonModal buttonContent="See test credit cards to use">
      <Text fontSize="lg" p={6}>
        Upon checkout, you will be redirected to Stripe for payment processing.
        It is in TEST mode. Therefore you can enter any of the following credit
        card numbers to simulate an order
      </Text>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Test Card Data </TableCaption>
          <Thead>
            <Tr>
              <Th>Card Type</Th>
              <Th isNumeric>Card Number</Th>
              <Th>cvv</Th>
              <Th>exp date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {creditCards.map((card, index) => {
              return (
                <Tr key={index}>
                  <Td>{card.name}</Td>
                  <Td isNumeric>{card.number}</Td>
                  <Td>{card.cvv}</Td>
                  <Td>{card.date}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </ButtonModal>
  );
}

export default CheckoutModal;
