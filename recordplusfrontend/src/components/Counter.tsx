import { Button, Center, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementAsync,
} from "../state/slices/counterSlice";
import { AppDispatch, RootState } from "../state/store";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Center mt="10px">Counter</Center>
      <Center fontSize={40}>{count}</Center>
      <Flex mt={4} gap={4} justify="center">
        <Button
          _hover={{
            // textDecoration: "underline",
            color: "teal",
          }}
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          _hover={{
            // textDecoration: "underline",
            color: "teal",
          }}
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          _hover={{
            // textDecoration: "underline",
            color: "teal",
          }}
          onClick={() => dispatch(incrementAsync(10))}
        >
          IncrementAyncBy10
        </Button>
      </Flex>
    </>
  );
};

export default Counter;
