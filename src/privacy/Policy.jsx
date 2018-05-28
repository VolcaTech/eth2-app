import React from "react";

const styles = {
    title: {
        fontSize: 36,
        fontFamily: 'SF Display Black',
        textAlign: 'left',
        lineHeight: 1,
        marginBottom: 50,
    },
    text: {
        fontSize: 24,
        fontFamily: 'SF Display Regular',
        lineHeight: 1,
        textAlign: 'left',
        marginBottom: 80
    },
    textBlue: {
        fontFamily: 'SF Display Bold',
        color: '#0099ff',
        display: 'inline'
    },
    textBold: {
        fontFamily: 'SF Display Black',
        display: 'inline'
    },
    link: {
        textDecoration: 'none',
        color: '#0099ff',
    }
}


class Terms extends React.Component {


    render() {
        return (
            <div>
                <div style={styles.text}>
                    <div style={styles.textBlue}>We at Eth2Phone (“Eth2Phone”, “we,” or “us”) believe that your privacy is a fundamental right. </div>
                    We have written this privacy policy (this “Policy”) to reflect our values, and to clearly describe what information we collect from you when you use our specially-developed Smart Contracts, as well as how we protect and use that information. The Smart Contracts and the website are collectively referred to in this Policy as the “App”. By using the App, you agree to the way we process your information as described in this Policy. This Policy only applies to the App, and not to any other websites, products or services you may be able to access or link to via the App. We encourage you to read the privacy policies of any other websites you visit before providing your information to them.
                    <br />
                    <br />
                    While our values will not shift, the App will evolve over time, and this Policy will change to reflect that evolution. If we make changes, we will notify you by revising the date at the top of this Policy. In some cases, <div style={styles.textBlue}>if we make significant changes, we may give you additional notice by adding a statement to our homepage, or by sending you an email notification. We encourage you to review this Policy periodically to stay informed about our practices.
                    </div>
                </div>
                <div>
                    <div style={styles.title}>Information We Do Collect</div>
                    <div style={styles.text}>
                        <div style={styles.textBlue}>When you send Ether: </div>we will ask you to provide us with receiver’s phone number and will essentially use your Ethereum wallet address for transaction. Phone number is stored hashed, letting us to check that phone is linked to transfer, but we can’t link phone number to receiver’s Ethereum address.
                        <br />
                        <br />
                        <div style={styles.textBlue}>When you receive Ether: </div>
                        we will ask you to provide us with your phone number and verify it with SMS code, the special code (please refer to FAQ for the process description), and will essentially use your Ethereum wallet address for transaction.
                        </div>
                </div>

                <div style={styles.title}>Information We Don’t Collect</div>
                <div style={styles.text}>
                    <div style={styles.textBlue}>We do not collect any other personally-identifiable information about you, unless you give it to us directly: </div>
                    by filling out a form, creating an account, giving us written feedback, communicating with us via third party social media sites, or otherwise communicating with us via the App or any other means. <div style={styles.textBlue}>We do not collect any payment information from you, other than your Ethereum wallet address.</div>
                </div>

                <div>
                    <div style={styles.title}>Information Usage</div>
                    <div style={styles.text}>
                        <div style={styles.textBold}>What We Do With Information We Collect</div>
                        <br />
                        <br />
                        <div style={styles.textBlue}>We use the information we collect in the following ways — to provide the main functionality of the App.</div>
                        <br />
                        <br />
                        We will create aggregations and anonymizations that contain your information in a way that does not directly identify you. We may use and/or share those aggregations and anonymizations for a variety of purposes related to the App, or our company and its business.
                        — To provide the main functionality of the App
<br />
                        <br />
                        <div style={styles.textBold}>What We Don’t Do With Information We Collect</div>
                        <br />
                        <br />
                        <div style={styles.textBlue}>We do not share any information that directly identifies you with any third party, except in the following limited cases:</div>
                        <br />
                        <br />
                        — As required to comply with applicable law or regulation, or to comply with law enforcement;
<br />
                        <br />
                        — To respond to claims and/or legal process;
<br />
                        <br />
                        — To protect our rights or our property, or to enforce our terms of service;
<br />
                        <br />
                        — To prevent behavior that is (or that we think may be) illegal or unethical.
<br />
                        <br />
                        With your consent, or at your request or direction or as otherwise set forth in this Policy.
                   </div>
                </div>
                <div style={styles.title}>Information Processing</div>
                <div style={styles.text}>
                    Depending on where you are located, your information may need to be transferred to different servers around the world as part of using the App. You acknowledge that, as part of making the App available to you, we may transfer your information to or maintain your information on computers located outside of your state, province, country, or other governmental jurisdiction, where the privacy laws may not be as protective as those in your jurisdiction. <div style={styles.textBlue}>By using the App, or by otherwise providing any information to us, you consent to the processing and transfer of that information in and to the U.S., and other countries.
                                    </div>
                </div>

                <div style={styles.title}>Information Security</div>
                <div style={styles.text}>
                    <div style={styles.textBlue}>We take safeguarding your information seriously. </div>
                    We will take reasonable administrative, physical, and electronic measures to help protect your information from loss, theft, misuse, unauthorized access, disclosure, alteration or destruction. All that said, no method of transmitting or storing information over the Internet is completely secure. With that in mind, we cannot guarantee the absolute security of your information.
                </div>

                <div style={styles.title}>Our Policy Towards Children</div>
                <div style={styles.text}>
                    <div style={styles.textBlue}>The App is not intended for use by children under the age of 13. </div>
                    If you are the parent or guardian of a child under the age of 13 and you become aware that your child has provided personally identifiable information to us without your and their consent, contact us at <a href="mailto:hi@eth2.io" style={styles.link}>hi@eth2.io</a>. If we become aware that a child under the age of 13 has provided us with their personally identifiable information, we will remove that information from our files.
                 </div>
                <div style={styles.title}>Contact Us</div>
                <div style={styles.text}>
                    <div style={styles.textBlue}>By contacting us at <a href="mailto:hi@eth2.io" style={styles.link}>hi@eth2.io</a>, you can:</div>
                    <br />
                    <br />
                    — See what information we have about you, if any;
<br />
                    <br />
                    — Change/correct any personal data we have about you;
<br />
                    <br />
                    — Have us delete any personal data we have about you (we will do our best to do so, but we may have to keep certain data as required by law, to comply with this Policy, or pursuant to our normal caching procedures);
<br />
                    <br />
                    — Opt out of receiving promotional communications from us;
<br />
                    <br />
                    — Ask questions or provide feedback on this Policy generally, or the use of your information.
                    </div>
            </div>
        )
    }
}


export default Terms;