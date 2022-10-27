import axios from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Card, Text, TextInput } from 'react-native-paper'

function CEP() {
  const [endereco, setEndereco] = useState({})
  const [cep, setCEP] = useState('')

  function buscaCEP() {
    axios
      .get(`https://cep.awesomeapi.com.br/json/${cep}`)
      .then(function ({ data, status }) {
        if (status === 200) setEndereco(data)
        else setEndereco({})
      })
      .catch(function (err) {
        setEndereco({})
      })
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Card>
        <Card.Title title='Informe o CEP' subtitle='Busque o endereço pelo CEP' />
        <Card.Content>
          <TextInput
            placeholder='60000000'
            label='CEP'
            onChangeText={function (text) {
              setCEP(text)
            }}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode='contained' onPress={buscaCEP}>
            Pesquisar
          </Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginTop: 32 }}>
        <Card.Content>
          <Text>{endereco.address}</Text>
          <Text>{endereco.city} - {endereco.state} - {endereco.district}</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

export default CEP