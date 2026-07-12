const api = process.env.NEXT_PUBLIC_BASE_API;

const coba = async() => {
  const data = await fetch(`${api}/menu`)
  const posts = await data.json()
  console.log(posts)
  return(
    <h3 className="text-black">asafjkasfhakfh</h3>
  )
}

export default coba