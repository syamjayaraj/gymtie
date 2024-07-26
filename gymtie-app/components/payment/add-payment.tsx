import { Button, FormControl, HStack, Input, Text } from "native-base";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddPaymentComponent = React.memo(
  ({ handleAddPayment }: { handleAddPayment: any }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const [date, setDate] = useState(new Date());

    const handleChangeDate = (event: any, selectedDate: any) => {
      const currentDate = selectedDate;
      setDate(currentDate);
    };

    const handleClickPaymentMethod = (param: string) => {
      setPaymentMethod(param);
    };

    return (
      <View style={styles.sectionContainer}>
        <FormControl>
          <Input
            variant="unstyled"
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.amount}
            isRequired={true}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={false}
              onChange={handleChangeDate}
            />
          </View>
          <Input
            variant="unstyled"
            placeholder="Note"
            value={note}
            onChangeText={setNote}
            style={styles.note}
          />
          <HStack mt={6} mb={6}>
            <TouchableOpacity
              style={[
                styles.paymentMethodContainer,
                {
                  backgroundColor: paymentMethod === "upi" ? "#6932a8" : "",
                },
              ]}
              onPress={() => handleClickPaymentMethod("upi")}
            >
              <Text style={styles.paymentMethod}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethodContainer,
                {
                  backgroundColor: paymentMethod === "cash" ? "#c2b027" : "",
                },
              ]}
              onPress={() => handleClickPaymentMethod("cash")}
            >
              <Text style={styles.paymentMethod}>CASH</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethodContainer,
                {
                  backgroundColor: paymentMethod === "card" ? "#a83267" : "",
                },
              ]}
              onPress={() => handleClickPaymentMethod("card")}
            >
              <Text style={styles.paymentMethod}>CARD</Text>
            </TouchableOpacity>
          </HStack>
        </FormControl>

        <Button
          leftIcon={<Ionicons style={styles.cashIcon} name="arrow-up" />}
          onPress={handleAddPayment}
          style={styles.button}
        >
          Pay Fee
        </Button>
      </View>
    );
  }
);

export default AddPaymentComponent;

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 0,
    marginTop: 10,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    width: "100%",
  },
  amount: {
    fontSize: 20,
  },
  note: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2b2b2b",
    color: "red",
  },
  dateContainer: {
    backgroundColor: "#2b2b2b",
    borderRadius: 5,
    paddingTop: 12,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "center",
  },
  month: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  date: {
    fontSize: 10,
    marginTop: -5,
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
  },
  year: {
    fontSize: 10,
    marginTop: -5,
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
  },
  typeContainer: {
    borderRadius: 3,
    width: 50,
  },
  type: {
    color: "white",
    textAlign: "center",
  },
  paymentMethodContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#edebeb",
    textAlign: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  paymentMethod: {
    marginLeft: 10,
    marginRight: 10,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 20,
    // marginBottom: 50,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  cashIcon: {
    fontSize: 17,
    color: "white",
  },
});
