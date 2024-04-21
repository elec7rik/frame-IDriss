import { Button, Frog, } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { pinata } from 'frog/hubs'


// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  hub: pinata(),
})

app.frame('/', (c) => {
  // const { buttonValue, inputText, status, frameData, verified } = c
  const { status, frameData, verified } = c
  // const inputButton = buttonValue

  console.log('verified', verified)
  console.log('frameData', frameData)

  const { fid } = frameData || {}
  console.log('fid', fid)

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          // background: 'linear-gradient(to right, #5865F2, #111827)',
          background: '#11DD74',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Check your eligibility for a free IDriss membership! ${fid?.toString()}`
            : 'Check your eligibility for a free IDriss membership!'}
        </div>
      </div>
    ),
    intents: [
      <Button action='/check' value="check">Check your eligibility</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/check', (c) => {
  const { frameData } = c
  const { fid } = frameData || {}

  if ( fid && fid > 20000) {
    return c.res({
      image: (
<div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #5865F2, #111827)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Awesome! You're eligible for a free IDriss membership since your FID is less than 20k.
          Don't forget to claim it by the end of April. Happy tipping!
        </div>
      </div>
      ),
      intents: [
        <Button.Link href="https://twitter.com/IDriss_xyz/status/1775508632622514460">Claim your membership</Button.Link>,
      ],
    });
  } else {
    return c.res({
          image: (
<div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(to right, #5865F2, #111827)',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Oops! You missed it this time since your FID is more than 20k. 
          Feel free to check our incredible plans though!
        </div>
      </div>
      ),
      intents: [
        <Button.Link href="https://www.idriss.xyz">Check out IDriss.xyz</Button.Link>,
      ],
    });
  }
  });

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
