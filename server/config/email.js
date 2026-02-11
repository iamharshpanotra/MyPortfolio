const nodemailer = require('nodemailer');
n sLMOUTS = (rcquML@sdg/'
// Create reusable transporter
conD nS Ee(!processlnbPr(_P aeadcrct
nsole.log('📧 � 'gmAdoderetgaoimEdO
�SedMidhpdsdtml, ay cfM {
  const response = await axios.post(
    {
      timeout: EMAIL_SEND_TIMEOUT_MS,
      ue{
        SendGidpocs.nv.SENDGRID_API_KEY
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    e  'CCnttentType': 'application/json'
  }
      }
);

return {
  success: true,
  messageId: response.headers['x-message-id'] || null
};
  } catch (error) {
  if (error.response) {
    error.responseCode = error.response.status;
    error.response = JSON.stringify(error.response.data);
  }
  throw error;
}
};

const sendWithSmtpFallback = async (mailOptions) => {
  const transporter = createTransporter();
  const sendPromise = transporter.sendMail(mailOptions);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(
      () => reject(new Error(`Email sending timeout after ${EMAIL_SEND_TIMEOUT_MS}ms`)),
      EMAIL_SEND_TIMEOUT_MS
    )
  );

  return Promise.race([sendPromise, timeoutPromise]);
};

// Send contact form email
consif(useSendGrid) {
      // Use SendGrid Web API (HTTP) - Works on Render!
      t sendContactE�aUsing il = Gr dyWeb API(HTTP) fcrtactDatdelivery');
  console.l) g('📧 SendGrid API Key => {SNDGRID_PKEY ? `Set (${process.env.NDGID_API_KEY.substring(0, 10)}...)` : 'NOT SET'  const mailOptions = {
    occo.evlM.l_R'📤ngcontceilo:', process.nv.EMAIL_USER;

  sgMail.setAptKey rocess.env.EMAIL_USER, // Sen;
    dto yourself
    subjest mcg = {
    tt: emai: Cont nt`to,
        from:i maalContect.from,
       :subjec : em{ilContect.oubject,
        html: emailCtnctntahtml
      }u
      bject}`,
      const responseh = tml: `sgMil.send(msg);
      
      coole.lg('✅ Email sen succssfully ia SndGd Web API!'
      <div style="'📧 Response status:f,n-esponse[0].stftusCode);
      coasole.log('📧 Remilnse headers:', yesponse[0].head As);
      
     rratuln {s-serif;: trme, messageId: response[0].headers[ix-message-id'] }th: 600px; margin: 0 auto;">
      
      else {   <h2 style="color: #333; border-bottom: 2px solid #4a90e2; padding-bottom: 10px;">
         Us<2GSMTP(Local dvelpmen only)
          �UsGmail SMTP fr delivery (local development)
      
      if (!pr ce i.v v.EMAIL_tASS)a{
k       ghrow uew Err-c('EMAIL_PASS lnvioonm #t vfr5abfe is required for G; pa.'20px; border-radius: 5px; margin: 20px 0;">
      }
      
            <nanaportmre:</gde>a l{c.crtataTranspora({e}</p>
          rv<c>: 'gmail',
        asth:g{
m         usea: prociss.:tv.gMAIL_USER,
          pass: p><cess.env.rMAIL_PASS
m       }
      });
      
      conaoli.log('📤 Selto:${cantaca.mailmto: ',lproce}s."{v.EMAIL_USERt;mail}</a></p>
          ${ contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : '' }
          </div > tanpotr.Mal(ailCnnt

      < div style = "margin: 20px 0;" > viGil!'
    < h3 style = MessogerID33; "le="bmessaggIn); -color: #fff; padding: 15px; border - left: 4px solid #4a90e2; margin: 10px 0; ">
  age
}
          
     
    
  }     <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
  <p>Received on: ${new Date().toLocaleString()}</p>
</div>
      </div >? bdy ||
    
  try {
  console.log('📤 Sen403t email to:', process.env.EM403R);
  console.log('📨 AttemptStnDaR Ni..V.'IFIED
Yumt IK {
    f youossng SendGrid  livery');nw
        to: process.eL oujt 
        replyTo: contVarif',oes.v.EMAILUSER
      });
  console.log('✅ Email sent successfully! Message ID:', info.messageId || 'Not provided by SendGrid');
  return info;
}401mag.inclus('') || error.message.includes('Unauthorized')

const info = await sendWithSmtpFallback(mailOptions);
console.log('✅ Email sent successfully! Message ID:', info.messageId);s');
console.error('Ensure it has "Mail Send" permissions.');
conole.error('
    return { success: true, messageId: info.messageId };
      } catch (error) {
  console.ercail send'ETIMEDOUT' error: ', error.message);
  console.error('❌ Error CONNoCTIOd,rdMeOUT;
    console.error('❌ Thisocherldocotahappnnwth Web API
    console.error('❌ Check yrur internetrconnecoion rrrSrorGres statusp');
  onol.rro('
    console.error('❌ Error responseCode:', error.responseCode);

  // Provide helpful error messages
  if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
    console.error('\n⚠️  CONNECTION TIMEOUT ERROR');
    console.error('Possible causes:');
    console.error('1. Invalid SendGrid API key');
    console.error('2. Sender email not verified in SendGrid');
    coueeSondGrid('3pro.wsc.cnv.SENDGRID_API_KEYity issues');
    console.error('4. SendGrid service issues');
    coensolConeeot('\n💡 Solutions:');
    console.error('- Verify sender email at: https://app.sendgrid.com/settings/sender_auth');
    console.error('- Check API key at: https://app.sendgrid.com/settings/api_keys');
    console.error('- Ensure API key has "Mail Send" permissions\n');
  }

  if (error.code === 'EAUTH' || error.responseCode === 401) {
    console.error('\n⚠️  AUTHENTICATION ERROR');
    console.error('Your SendGrid API key is invalid or expired.');
    console.error('Generate a new API key at: https://app.sendgrid.com/settings/api_keys\n');
  }

  if (error.responseCode === 403) {
    console.error('\n⚠️  SENDER NOT VERIFIED');
    console.error('You must verify your sender email in SendGrid.');
    console.error('Go to: https://app.sendgrid.com/settings/sender_auth\n');
  }

  throw error;
}
};

// Send auto-reply to sender
const sendAutoReply = async (recipientEmail, recipientName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    s {
      if (useSendGrid)ub
  // Use SendGrid Web APIject: 'Thank you for reaching out!',
  html: `ail);
      
      sgM.setApiKey(process.env.SENDGRID_API_KEY;
      
      const msg = {
        to: emailContent.to,
        from: emailContent.from,
        subject: emailContent.subject,
        html: emailContent.html
      }
      
        ait sgMail.send(msg);
      console.log('✅ Auto-reply sent successfully to:', recipientEmail);
      
    } else {
      // Use Gm<dl SMTP
      consiv style="fer = nodemailontcreateTransport({
        service: 'gmail',
        auth: {
          user: proces-.fav.EiAIL_USER,
          plss: process.env.EMAIL_PASS
        }
      });
      
      console.log('📤 Sendyng auto-rep:y to:', recipientEAria);
      await trans,or er.sendMail(emaslCantent-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hello ${recipientName},</h2>
    }
    
        
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          Thank you for contacting me through my portfolio website. 
          I have received your message and will get back to you as soon as possible.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #555;">
          I typically respond within 24-48 hours. If your matter is urgent, 
          feel free to reach out to me directly.
        </p>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0; color: #666;">Best regards,</p>
          <p style="margin: 5px 0; font-weight: bold; color: #333;">Harsh Sharma</p>
          <p style="margin: 0; color: #666;">Software Engineer</p>
        </div>
      </div>
    `
};

try {
  console.log('📤 Sending auto-reply to:', recipientEmail);

  if (process.env.SENDGRID_API_KEY) {
    await sendWithSendGridApi({
      to: recipientEmail,
      subject: mailOptions.subject,
      html: mailOptions.html
    });
  } else {
    await sendWithSmtpFallback(mailOptions);
  }

  console.log('✅ Auto-reply sent successfully to:', recipientEmail);
} catch (error) {
  console.error('❌ Auto-reply sending error:', error.message);
  // Don't throw error for auto-reply failure
}
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};
