import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { ErrorHandler } from '../utils/ErrorHanldler';
import { FontFamily } from '../utils/fontFamily';

const GlobalModal = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'error' | 'success'>('error');
  const [toastVisible, setToastVisible] = useState(false);

const showModal = (msg: string, modalType: 'error' | 'success' = 'error') => {
  if (modalType === 'success') {
    setMessage(msg);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 2000);

    return; // 🚀 stop modal
  }

  // ❌ error → modal
  setMessage(msg);
  setType(modalType);
  setVisible(true);
};

  useEffect(() => {
    ErrorHandler.register(showModal);
  }, []);

  return (
    <>
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            width: '80%',
            backgroundColor: '#0B022C',
            // padding: 20,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent:"center",
            minHeight:200
          }}
        >
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              color: "#fff",
              fontSize:16,
                  fontFamily:FontFamily.secondaryFontFamily
              
              
            }}
          >
            {message}
          </Text>

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{
              backgroundColor: "#FF8C1A",
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#0D1227', fontWeight:"700" , fontSize:16,fontFamily:FontFamily.secondaryFontFamily}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    {toastVisible && (
  <View
    style={{
      position: 'absolute',
      bottom: 40,
      left: 20,
      right: 20,
      alignItems: 'center',
    }}
  >
    <View
      style={{
        backgroundColor: '#0B022C',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: '#fff', fontSize: 14,fontFamily:FontFamily.secondaryFontFamily }}>
        {message}
      </Text>
    </View>
  </View>
)}
</>
  );
};

export default GlobalModal;