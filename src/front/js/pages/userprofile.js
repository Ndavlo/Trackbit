import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/userprofile.css";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

export const Userprofile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');


  function submitUpdate(e) {
    e.preventDefault()
    actions?.updateUserInfo(title, bio)
    return "ok"
  }
  function actualizaImagen(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', profilePic);
    actions?.updateProfilePic(formData)
    return "ok"
  }



  useEffect(() => {
    if (store.accessToken === null) return
    if (store.accessToken == '') {
      navigate('/')
    } else {
      actions.getUserInfo()
      actions.getHabits()
        .then(() => {
          setTitle(store.userInfo?.['title'])
          setBio(store.userInfo?.['bio'])
          setProfilePic(store.userInfo?.['profile_pic'])
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
                  <img src={store.userInfo?.["profile_pic"]} alt="profilepicture" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <div>
                      <h4>{`${store.userInfo?.['name']} ${store.userInfo?.['last_name']}`}</h4>
                      <p className="text-secondary">{`${store.userInfo?.['title'] || ''}`}</p>
                      <p className="text-muted text-break" id="userBio">{`${store.userInfo?.['bio'] || ''}`}</p>
                    </div>

                    {/* PROFILE INFO MODAL */}
                    <div className="modal fade" id="profileUpdateModal" tabIndex="-1" aria-labelledby="profileUpdateModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="profileUpdateModalLabel">Actualiza tu perfil</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <form id="updateForm">
                              <div className="mb-3">
                                <div className="picUpdate">
                                <label for="avatar">Sube tu foto de perfil</label>
                                <input type="file"
                                  id="avatar" name='file'
                                  accept="image/png, image/jpeg, image/jpg" onChange={(e)=> setProfilePic(e.target.files[0])}/>
                                  <button className="btn" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {actualizaImagen(e)}}>Actualiza foto de perfil</button>
                                </div>
                                  <label htmlFor="name" className="form-label text-dark">Titulo</label>
                                  <input type="text" className="form-control text-dark" maxLength="80" value={title} id="inputText" aria-describedby="name" onChange={(e) => setTitle(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label text-dark">Bio</label>
                                <textarea
                                  className="form-control text-dark bioInput"
                                  maxLength="250"
                                  value={bio}
                                  id="inputText"
                                  aria-describedby="name"
                                  rows="3"
                                  cols="3"
                                  onChange={(e) => setBio(e.target.value)}
                                />
                              </div>
                              <div className="modal-footer">
                                <button type="submit" className="btn" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => submitUpdate(e)}>Actualizar</button>
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

              <div className="card-footer">
                <a className="float-end bg-transparent text-light" type="button" data-bs-toggle="modal" data-bs-target="#profileUpdateModal"><i className="bi bi-pencil-fill"></i></a>
              </div>


            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header"><h3>Mis rutinas</h3></div>
              <div className="card-body">
                <div className="row">

                  {store.habits.map((e, i) => {
                    return (<>
                      <div className="col">
                        <Link className="rutinaLink" key={i} to="/dashboard">
                          <div className="rutinasPerfil">
                            <div className="perfilBoton" >{`${e.name}`}</div>
                          </div>
                        </Link>
                      </div>


                    </>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-header text-center"> <h3>Donaciones</h3></div>
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
