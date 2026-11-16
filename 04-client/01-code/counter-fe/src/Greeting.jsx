// Greeting.jsx — receives props
function Greeting({ name, role }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are an {role}.</p>
    </div>
  )
}

export default Greeting
