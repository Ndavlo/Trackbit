import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userprofile.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export const Userprofile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');

function submitUpdate(e){
  e.preventDefault()
actions?.updateUserInfo(title, bio)
return "ok"
}


  useEffect(() => {
    if (store.accessToken === null) return
    if (store.accessToken == '') {
      navigate('/')
    } else {
      actions.getUserInfo()
      .then(()=> {
        setTitle(store.userInfo?.['title'])
        setBio(store.userInfo?.['bio'])
      }) 

    }
  }, [store.accessToken])

  console.log(store.userInfo)
  return (

    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm profileContainer">
          <div className="col-md-4 mb-3">
            <div className="card profileCard">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://d3a7c97d5beed5ab2c49-7aac60cfdebb59ab39bebc5ac6e3d5b2.ssl.cf5.rackcdn.com/27640000/27642431/_xs959ce358e310887ed8d155f4558024e5.jpg" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <div>
                    <h4>{`${store.userInfo?.['name']} ${store.userInfo?.['last_name']}`}</h4>
                    <p className="text-secondary">{`${store.userInfo?.['title'] || ''}`}</p>
                    <p className="text-muted text-break" id="userBio">{`${store.userInfo?.['bio'] || ''}`}</p>
                    <button className="btn" type="button" data-bs-toggle="modal" data-bs-target="#profileUpdateModal"><i className="bi bi-pencil-fill"></i></button>
                    </div>

                    {/* MODAL */}
                    <div class="modal fade" id="profileUpdateModal" tabindex="-1" aria-labelledby="profileUpdateModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="profileUpdateModalLabel">Actualiza tu perfil</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form id="updateForm">
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label text-dark">Titulo</label>
                                <input type="text" className="form-control text-dark" maxlength="80" value={title} id="inputText" aria-describedby="name" onChange={(e) => setTitle(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label text-dark">Bio</label>
                                <input type="text" className="form-control text-dark" maxlength="150" value={bio} id="inputText" aria-describedby="name" onChange={(e) => setBio(e.target.value)} />
                              </div>
                          <div class="modal-footer">
                            <button type="button" class="btn" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn" onClick={(e) => submitUpdate(e)}>Actualizar</button>
                          </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* MODAL */}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header"><h3>Mis rutinas</h3></div>
              <div className="card-body">
                <p>Rutina 1</p>
                <p>Rutina 2</p>
                <p>Rutina 3</p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header text-center"> <h3>Subscribete a mis rutinas</h3></div>
              <div className="card-body">
                <div className="paypalBody">
                  <PayPalScriptProvider options={{ "client-id": "AfYf4HLbfgYURu37d1Tis6_HugMlfZC3ashcDlp4ZBLDme44cLfL-wmR6rRjeVOcBmISi9lw2bUTRE2u" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "1.99",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





  );
};
