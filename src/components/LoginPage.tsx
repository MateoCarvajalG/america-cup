import { useContext, useState } from "react";
import 'antd/dist/antd.css'
import { AuthContext } from "../context/AuthContext";
import {  Button, Form, Input, Modal, notification  } from 'antd';
import ModalUserRegister from "./ModalUserRegister";
import { showError } from "../alerts";
import logo from '../assets/logo.png'

function LoginPage() {
  const { signin } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values:any) => { 
    signin(values).then((res:any)=>{
    }).catch((err:any)=>{
      notification.error({
        message: 'Error',
        description:
          showError(err.response),
      });
    })
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <img src={logo} className="img-logo-login" alt="" />
      <div className="form-login">
        <h1>Ingresa con tu documento de identidad</h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Usuario"
            name="document"
            rules={[
              {
                required: true,
                message: 'Introduzca un usuario',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Introduzca una contraseña',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ingresar
            </Button>


            <Button type="link" onClick={()=>setIsModalOpen(true)}>
              Registrarse
            </Button>
          </Form.Item>
        </Form>

      </div>
      <Modal footer={[]} className='modal-registered'title="Detalle del partido" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ModalUserRegister setIsModalOpen={setIsModalOpen}/>
      </Modal>
    </div>
  );
}
export default LoginPage;
