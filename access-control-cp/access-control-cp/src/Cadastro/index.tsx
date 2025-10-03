import { useForm } from "react-hook-form";
import type { TipoUsuario } from "../types/tipoUsuario";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL_USUARIOS;

export default function Cadastro(){

  const navigateLogin = useNavigate();

    const{register, handleSubmit, formState:{errors}} = useForm<TipoUsuario>({
        mode:"onChange"
    });

    const onSubmit = handleSubmit(async (data: TipoUsuario) => {
  try {

    const res = await fetch(API_URL);
    const usuarios: TipoUsuario[] = await res.json();


const usuarioJaExiste  = usuarios.filter(
  (u) => u.nomeUsuario.toLowerCase() === data.nomeUsuario.toLowerCase() && u.email.toLowerCase() === data.email.toLowerCase()
);

if(usuarioJaExiste){
  alert("Usuário já cadastrado");
  return;
}
    await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),
    });

    alert("Usuário cadastrado com sucesso!");
    navigateLogin("/")
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar.");
  }
});

    const handleLogout = ()=>{
    localStorage.removeItem("usuarioLogado")
    window.location.reload();
  };

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado") || "null")


    return(
 <main>
      <h1>Cadastrar usuários</h1>
      <div className="text-center bg-amber-100">
      {usuario ? (
        <div className="usuario-logado">
          <p className="bemvindo">Bem-vindo, {usuario.nome}</p>
          <button onClick={handleLogout} className="logout-btn">Sair</button>
        </div>
        ) : (
          <p className="text-gray-700 font-medium mb-4">Bem-vindo visitante</p>
        )}

      </div>



      <div className="mx-auto w-[40%]">
        <form onSubmit={onSubmit} className="frmEditarUsuario">
          <fieldset>
            <legend>Usuário</legend>
            <div>
              <label htmlFor="idNome">Nome:</label>
              <input type="text" id="idNome" className="bg-amber-50" {...register("nome", { required: true ,maxLength: 200, minLength:3})} 
              aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "nome-error" : undefined} />
              {errors.nome && <span role="alert" id="nome-error" className="text-red-600 bg-red-300 border-[1px] border-red-600 rounded-md p-2">Digite um nome válido!</span>} 
            </div>
            <div>
              <label htmlFor="idNomeUsuario">Nome de usuário:</label>
              <input type="text" id="idNomeUsuario" className="bg-amber-50" {...register("nomeUsuario", { required: true ,maxLength: 200, minLength:3 })} 
              aria-invalid={!!errors.nomeUsuario} aria-describedby={errors.nomeUsuario ? "nomeUsuario-error" : undefined} />
              {errors.nomeUsuario && <span role="alert" id="nomeUsuario-error" className="text-red-600 bg-red-300 border-[1px] border-red-600 rounded-md p-2">Nome de usuário inválido!</span>}
            </div>
            <div>
              <label htmlFor="idEmail">E-mail do usuário:</label>
              <input type="email" id="idEmail" className="bg-amber-50" {...register("email",{required: true, minLength:5,maxLength:255})} 
              aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <span role="alert" id="email-error" className="text-red-600 bg-red-300 border-[1px] border-red-600 rounded-md p-2">Email inválido.</span>}
            </div>
            <div>
              <button type="submit">Cadastrar</button>
              <button onClick={()=> navigateLogin("/")}>Login</button>
            </div>
          </fieldset>
        </form>

      </div>
    </main>
    )
}