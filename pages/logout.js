import IndexCheck from './components/index-check'


export default function Dashboard() {


    const handleLogout = () => {

        //file add
        const reader = new FileReader();

        reader.onload = (event) => {
            const base64String = event.target.result;
            const user = {
                ...formData,
                profilePicture: base64String,
            };


            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
        };


        if (formData.profilePicture) {
            reader.readAsDataURL(formData.profilePicture);
        } else {
            alert('Please upload a profile picture.');
        }
    };

  return(
    <>
      <IndexCheck/>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
