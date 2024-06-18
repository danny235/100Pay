import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { LightText, MediumText } from "./components/styles/styledComponents";
import { Button } from "./components/Button/Button";
import { Colors } from "./components/Colors";
import { err } from "react-native-svg";
import { CloseCircle, Refresh, RefreshCircle, } from "iconsax-react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: "" };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("This is from error state:", error, errorInfo);
    this.setState({ errorMessage: error.message });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View style={styles.container}>
          <View className="flex items-center justify-center flex-1">
            <MediumText style={styles.errorText}>
              Oops!
            </MediumText>
            <LightText style={{ fontSize: 17, color: Colors.grayText }}>
              {this.state.errorMessage}
            </LightText>
            <CloseCircle variant="Bulk" size={100} color={Colors.primary} />
          </View>
          <View className="mt-auto p-10">
            <Button variant="primary" onPress={this.handleRetry}>
              <MediumText style={{ color: Colors.white, marginTop: "auto" }}>
                Reload
              </MediumText>
              <Refresh size={20} color={Colors.white} />
            </Button>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 30,
    color: Colors.primary,
    marginBottom: 10,
  },
});

export default ErrorBoundary;
