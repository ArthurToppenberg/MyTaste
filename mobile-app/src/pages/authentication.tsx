import React from 'react';
import { View, Alert } from 'react-native';

import Login from '../components/login';
import SelectionBox from '../components/button_box';
import InfoBox from '../components/info_box';

enum AuthMethod {
    None,
    Login,
    CreateAccount
}

export default function Index() {
    const [authMethod, setAuthMethod] = React.useState<AuthMethod>(AuthMethod.None);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 2.5 }}>
                {authMethod === AuthMethod.None && <InfoBox text={'Please select a prefered method to sign in'} image={require('../assets/placeholder.png')}/>}
                {authMethod === AuthMethod.Login && <Login />}
            </View>
            <View style={{ flex: 1.5 }}>
                {authMethod === AuthMethod.None && <SelectAuthMethod />}
                {authMethod !== AuthMethod.None && <ResetAuthMethod />}
            </View>
        </View>
    );

    function SelectAuthMethod() {
        return (
            <SelectionBox buttons={[
                {
                    title: "Login",
                    onPress: function (): void {
                        setAuthMethod(AuthMethod.Login);
                    }
                },
                {
                    title: "Create Account",
                    onPress: function (): void {
                        //alrt this function is not created yet
                        Alert.alert('This is still in development');
                    }
                }
            ]} />
        );
    }

    function ResetAuthMethod(){
        return (
            <SelectionBox buttons={[
                {
                    title: "Back",
                    onPress: function (): void {
                        setAuthMethod(AuthMethod.None);
                    }
                },
            ]} />
        );
    }
}
