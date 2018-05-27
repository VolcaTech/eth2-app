import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


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
    bold: {
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
                <div style={styles.text}>Eth2Phone is a web application (a website that the user can interact with (the “Site”) that runs on the Ethereum network, using specially-developed smart contracts (each, a “Smart Contract”) to enable users to send and receive ethereum, verifying themselves via phone number. The Smart Contracts and the Site are collectively referred to in these Terms as the “App”.
                "Eth2Phone" (or "we", or "us") is making the App available to you. Before you use the App, the Smart Contracts, or the Site, however, you will need to agree to these Terms of Use and any terms and conditions incorporated herein by reference (collectively, these “Terms").
PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE APP, THE SMART CONTRACTS, OR THE SITE. THESE TERMS GOVERN YOUR USE OF THE APP, THE SMART CONTRACTS, AND THE SITE, UNLESS WE HAVE EXECUTED A SEPARATE WRITTEN AGREEMENT WITH YOU FOR THAT PURPOSE. WE ARE ONLY WILLING TO MAKE THE APP, THE SMART CONTRACTS, AND THE SITE AVAILABLE TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING THE APP, THE SMART CONTRACTS, THE SITE, OR ANY PART OF THEM, OR BY CLICKING “I ACCEPT” BELOW OR INDICATING YOUR ACCEPTANCE IN AN ADJOINING BOX, YOU ARE CONFIRMING THAT YOU UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF, IN WHICH CASE “YOU” WILL MEAN THAT ENTITY. IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT ACCEPT ALL OF THESE TERMS, THEN WE ARE UNWILLING TO MAKE THE APP, THE SMART CONTRACTS, OR THE SITE AVAILABLE TO YOU. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE THE APP, THE SMART CONTRACTS, OR THE SITE.</div>
                <div>
                    <div style={styles.title}>1. App</div>
                    <div style={styles.text}>
                        <div style={styles.bold}>A.</div> The App will only recognize you as a user, and you will only be able to interact with the App, if your Ethereum electronic wallet is connected and unlocked. There is no other way to interact directly with the App. For now we recommend using Trust Wallet to get the best experience, however you can use any other wallet.
                        <br />
                        <br />
                        <div style={styles.bold}>B.</div> Transactions that take place on the App are managed and confirmed via the Ethereum blockchain. You understand that your Ethereum public address will be made publicly visible whenever you engage in a transaction on the App.
                        <br />
                        <br />
                        <div style={styles.bold}>C.</div> We neither own nor control Trust Wallet, Cipher, Toshi, MetaMask, Google Chrome, the Ethereum network, or any other wallet, third party site, product, or service that you might access, visit, or use for the purpose of enabling you to use the various features of the App. We will not be liable for the acts or omissions of any such third parties, nor will we be liable for any damage that you may suffer as a result of your transactions or any other interaction with any such third parties.
                        <br />
                        <br />
                        <div style={styles.bold}>D.</div> You must provide accurate and complete information when making a transaction via App. Even though we worked to create the system that will have maximum available security at the time, also making it possible to cancel wrong transactions, the product is still in beta and you are solely responsible for the security of your assets, and your  wallet (Trust Wallet or other Ethereum wallets and accounts).
               </div>
                </div>
                <div>
                    <div style={styles.title}>3. Fees and Payment</div>
                    <div style={styles.text}>
                        <div style={styles.bold}>A.</div> Any financial transactions that you engage in will be conducted solely through the Ethereum network via the chosen wallet. We will have no insight into or control over these payments or transactions from the side of wallet. With that in mind, we will have no liability to you or to any third party for any claims or damages that may arise as a result of any transactions that you engage in via the App, sending and receiving assets from wallet onto the Smart Contracts or from Smart Contract to wallet, or any other transactions that you conduct via the Ethereum network and chosen wallet. Simply speaking, we have no control on how transactions are carried out within your chosen wallet and have no responsibilities for that.
<br />
                        <br />
                        <div style={styles.bold}>B.</div> Ethereum requires the payment of a transaction fee (a “Gas Fee”) for every transaction that occurs on the Ethereum network. The Gas Fee funds the network of computers that run the decentralized Ethereum network. This means that you will need to pay a Gas Fee for each transaction that occurs via the App. The gas fee is currently automatically calculated and included by us into the transaction. When sending assets, you will be shown the final amount to be paid. Please be aware of that.<br />
                        <br />
                        <div style={styles.bold}>C.</div> As between us, you will be solely responsible to pay any and all sales, use, value-added and other taxes, duties, and assessments (except taxes on our net income) now or hereafter claimed or imposed by any governmental authority (collectively, “Taxes”) associated with your use of the App. Except for income taxes levied on Eth2Phone, you: (1) will pay or reimburse us for all national, federal, state, local or other taxes and assessments of any jurisdiction, including value added taxes and taxes as required by international tax treaties, customs or other import or export taxes, and amounts levied in lieu thereof based on charges set, services performed or payments made hereunder, as are now or hereafter may be imposed under the authority of any national, state, local or any other taxing jurisdiction; and (2) shall not be entitled to deduct the amount of any such taxes, duties or assessments from payments made to us pursuant to these Terms.
               </div>
                </div>
                <div>
                    <div style={styles.title}>4. Ownership. Restrictions</div>
                    <div style={styles.text}>
                        <div style={styles.bold}>A.</div> You acknowledge and agree that we (or, as applicable, our licensors) own all legal right, title and interest in and to all elements of the App, and all intellectual property rights therein. The visual interfaces, graphics (including, without limitation, all art and drawings associated with the Eth2Phone), design, systems, methods, information, computer code, software, services, organization, compilation of the content, code, data, and all other elements of the App (collectively, the “Eth2Phone Materials”) are owned by Eth2Phone, and are protected by copyright, trade dress, patent, and trademark laws, international conventions, other relevant intellectual property and proprietary rights, and applicable laws. All Axiom Materials are the copyrighted property of Eth2Phone or its licensors, and all trademarks, service marks, and trade names contained in the Eth2Phone Materials are proprietary to Eth2Phone or its licensors. Except as expressly set forth herein, your use of the App does not grant you ownership of or any other rights with respect to any content, code, data, or other materials that you may access on or through the App.
<br />
                        <br />
                        <div style={styles.bold}>B.</div> You may choose to submit comments, bug reports, ideas or other feedback about the App, including without limitation about how to improve the App (collectively, “Feedback”). By submitting any Feedback, you agree that we are free to use such Feedback at our discretion and without additional compensation to you, and to disclose such Feedback to third parties (whether on a non-confidential basis, or otherwise). You hereby grant us a perpetual, irrevocable, nonexclusive, worldwide license under all rights necessary for us to incorporate and use your Feedback for any purpose.
<br />
                        <br />
                        <div style={styles.bold}>C.</div> You agree that you are responsible for your own conduct while accessing or using the App, and for any consequences thereof. You agree to use the App only for purposes that are legal, proper and in accordance with these Terms and any applicable laws or regulations. By way of example, and not as a limitation, you may not, and may not allow any third party to: (1) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent, obscene, or otherwise objectionable content; (2) distribute viruses, worms, defects, Trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature; (3) impersonate another person (via the use of an email address or otherwise); (4) upload, post, transmit or otherwise make available through the App any content that infringes the intellectual proprietary rights of any party; (5) use the App to violate the legal rights (such as rights of privacy and publicity) of others; (6) engage in, promote, or encourage illegal activity (including, without limitation, money laundering); (7) interfere with other users’ enjoyment of the App; (8) exploit the App for any unauthorized commercial purpose; (9) modify, adapt, translate, or reverse engineer any portion of the App; (10) remove any copyright, trademark or other proprietary rights notices contained in or on the App or any part of it; (11) reformat or frame any portion of the App; (12) display any content on the App that contains any hate-related or violent content or contains any other material, products or services that violate or encourage conduct that would violate any criminal laws, any other applicable laws, or any third party rights; (13) use any robot, spider, site search/retrieval application, or other device to retrieve or index any portion of the App or the content posted on the App, or to collect information about its users for any unauthorized purpose; (14) create user accounts by automated means or under false or fraudulent pretenses; or (15) access or use the App for the purpose of creating a product or service that is competitive with any of our products or services.
               </div>
                </div>
                <div>
                    <div style={styles.title}>5. Termination</div>
                    <div style={styles.text}>
                        You may terminate these Terms at any time by canceling your account on the App and discontinuing your access to and use of the App. You will not receive any refunds if you cancel your account, or otherwise terminate these Terms. You agree that we, in our sole discretion and for any or no reason, may terminate these Terms and suspend and/or terminate your account(s) for the App. You agree that any suspension or termination of your access to the App may be without prior notice, and that we will not be liable to you or to any third party for any such suspension or termination. If we terminate these Terms or suspend or terminate your access to or use of the App due to your breach of these Terms or any suspected fraudulent, abusive, or illegal activity, then termination of these Terms will be in addition to any other remedies we may have at law or in equity. Upon any termination or expiration of these Terms, whether by you or us, you may no longer have access to information that you have posted on the App or that is related to your account, and you acknowledge that we will have no obligation to maintain any such information in our databases or to forward any such information to you or to any third party. Sections 2.C and 3 through 15 will survive the termination or expiration of these Terms for any reason. </div>
                </div>
                <div>
                    <div style={styles.title}>6. Disclaimers</div>
                    <div style={styles.text}>
                        <div style={styles.bold}>A.</div> YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR ACCESS TO AND USE OF THE APP IS AT YOUR SOLE RISK, AND THAT THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS MAKE NO EXPRESS WARRANTIES AND HEREBY DISCLAIM ALL IMPLIED WARRANTIES REGARDING THE APP AND ANY PART OF IT (INCLUDING, WITHOUT LIMITATION, THE SITE, ANY SMART CONTRACT, OR ANY EXTERNAL WEBSITES), INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, CORRECTNESS, ACCURACY, OR RELIABILITY. WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT REPRESENT OR WARRANT TO YOU THAT: (1) YOUR ACCESS TO OR USE OF THE APP WILL MEET YOUR REQUIREMENTS, (2) YOUR ACCESS TO OR USE OF THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE OR FREE FROM ERROR, (3) USAGE DATA PROVIDED THROUGH THE APP WILL BE ACCURATE, (4) THE APP OR ANY CONTENT, SERVICES, OR FEATURES MADE AVAILABLE ON OR THROUGH THE APP ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR (5) THAT ANY DATA THAT YOU DISCLOSE WHEN YOU USE THE APP WILL BE SECURE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH CONSUMERS, SO SOME OR ALL OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
 <br />
                        <br />
                        <div style={styles.bold}>B.</div> YOU ACCEPT THE INHERENT SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET, AND AGREE THAT WE HAVE NO LIABILITY OR RESPONSIBILITY FOR ANY BREACH OF SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE.
<br />
                        <br />
                        <div style={styles.bold}>C.</div> WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSSES YOU INCUR AS THE RESULT OF YOUR USE OF THE ETHEREUM NETWORK OR THE METAMASK ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS ARISING FROM: (A) USER ERROR, SUCH AS FORGOTTEN PASSWORDS OR INCORRECTLY CONSTRUED SMART CONTRACTS OR OTHER TRANSACTIONS; (B) SERVER FAILURE OR DATA LOSS; (C) CORRUPTED WALLET FILES; (D) UNAUTHORIZED ACCESS OR ACTIVITIES BY THIRD PARTIES, INCLUDING BUT NOT LIMITED TO THE USE OF VIRUSES, PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE APP, ETHEREUM NETWORK, OR THE METAMASK ELECTRONIC WALLET.
<br />
                        <br />
                        <div style={styles.bold}>D.</div> ETH2PHONE ARE INTANGIBLE DIGITAL ASSETS THAT EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD MAINTAINED IN THE ETHEREUM NETWORK. ALL SMART CONTRACTS ARE CONDUCTED AND OCCUR ON THE DECENTRALIZED LEDGER WITHIN THE ETHEREUM PLATFORM. WE HAVE NO CONTROL OVER AND MAKE NO GUARANTEES OR PROMISES WITH RESPECT TO SMART CONTRACTS.
                        <br />
                        <br />
                        <div style={styles.bold}>E.</div> ETH2PHONE IS NOT RESPONSIBLE FOR LOSSES DUE TO BLOCKCHAINS OR ANY OTHER FEATURES OF THE ETHEREUM NETWORK OR THE METAMASK ELECTRONIC WALLET, INCLUDING BUT NOT LIMITED TO LATE REPORT BY DEVELOPERS OR REPRESENTATIVES (OR NO REPORT AT ALL) OF ANY ISSUES WITH THE BLOCKCHAIN SUPPORTING THE ETHEREUM NETWORK, INCLUDING FORKS, TECHNICAL NODE ISSUES, OR ANY OTHER ISSUES HAVING FUND LOSSES AS A RESULT.
</div>
                </div>
                <div>
                    <div style={styles.title}>7. Limitation of Liability</div>
                    <div style={styles.text}>
                        <div style={styles.bold}>A.</div> YOU UNDERSTAND AND AGREE THAT WE, OUR SUBSIDIARIES, AFFILIATES, AND LICENSORS WILL NOT BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES WHICH YOU MAY INCUR, HOWSOEVER CAUSED AND UNDER ANY THEORY OF LIABILITY, INCLUDING, WITHOUT LIMITATION, ANY LOSS OF PROFITS (WHETHER INCURRED DIRECTLY OR INDIRECTLY), LOSS OF GOODWILL OR BUSINESS REPUTATION, LOSS OF DATA, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR ANY OTHER INTANGIBLE LOSS, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
<br />
                        <br />
                        <div style={styles.bold}>B.</div> YOU AGREE THAT OUR TOTAL, AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR ACCESS TO OR USE OF (OR YOUR INABILITY TO ACCESS OR USE) ANY PORTION OF THE APP, WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, IS LIMITED TO THE GREATER OF (A) THE AMOUNTS YOU ACTUALLY PAID US UNDER THESE TERMS IN THE 12 MONTH PERIOD PRECEDING THE DATE THE CLAIM AROSE, OR (B) $100.
 <br />
                        <br />
                        <div style={styles.bold}>C.</div> YOU ACKNOWLEDGE AND AGREE THAT WE HAVE MADE THE APP AVAILABLE TO YOU AND ENTERED INTO THESE TERMS IN RELIANCE UPON THE WARRANTY DISCLAIMERS AND LIMITATIONS OF LIABILITY SET FORTH HEREIN, WHICH REFLECT A REASONABLE AND FAIR ALLOCATION OF RISK BETWEEN THE PARTIES AND FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN US. WE WOULD NOT BE ABLE TO PROVIDE THE APP TO YOU WITHOUT THESE LIMITATIONS.
<br />
                        <br />
                        <div style={styles.bold}>D.</div> SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, AND SOME JURISDICTIONS ALSO LIMIT DISCLAIMERS OR LIMITATIONS OF LIABILITY FOR PERSONAL INJURY FROM CONSUMER PRODUCTS, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO PERSONAL INJURY CLAIMS.</div>
                </div>
                <div>
                    <div style={styles.title}>8. Assumption of Risk</div>
                    <div style={styles.text}>
                        You accept and acknowledge each of the following:
                    <br />
                        <br />
                        <div style={styles.bold}>A.</div> There are risks associated with using an Internet-based currency, including, but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that Eth2Phone will not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Ethereum network, however caused.
<br />
                        <br />
                        <div style={styles.bold}>B.</div> A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of the Eth2Phone ecosystem, and therefore the potential utility or value of Eth2Phone.<br />
                        <br />
                        <div style={styles.bold}>C.</div> The regulatory regime governing blockchain technologies, cryptocurrencies, and tokens is uncertain, and new regulations or policies may materially adversely affect the development of the Eth2Phone ecosystem, and therefore the potential utility or value of Eth2Phone.<br />
                        <br />
                        <div style={styles.bold}>D.</div> Upgrades by Ethereum to the Ethereum platform, a hard fork in the Ethereum platform, or a change in how transactions are confirmed on the Ethereum platform may have unintended, adverse effects on all blockchains using the ERC-20 standard, including the Eth2Phone ecosystem.

</div>
                </div>
                <div>
                    <div style={styles.title}>9. Indemnification</div>
                    <div style={styles.text}>
                        You agree to hold harmless and indemnify Eth2Phone and its subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability, loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost, and attorneys’ fees arising out of or in any way related to (1) your breach of these Terms, (2) your misuse of the App, or (3) your violation of applicable laws, rules or regulations in connection with your access to or use of the App. You agree that Eth2Phone will have control of the defense or settlement of any such claims.
                </div>
                </div>

                <div>
                    <div style={styles.title}>10. External Sites</div>
                    <div style={styles.text}>
                        The App may include hyperlinks to other web sites or resources or mobile apps (collectively, “External Sites”), which are provided solely as a convenience to our users. We have no control over any External Sites. You acknowledge and agree that we are not responsible for the availability of any External Sites, and that we do not endorse any advertising, products or other materials on or made available from any External Sites. Furthermore, you acknowledge and agree that we are not liable for any loss or damage which may be incurred as a result of the availability or unavailability of the External Sites, or as a result of any reliance placed by you upon the completeness, accuracy or existence of any advertising, products or other materials on, or made available from, any External Sites.                </div>
                </div>

                <div>

                    <div style={styles.title}>11.Changes to the Terms</div>
                    <div style={styles.text}>
                        We may make changes to the Terms from time to time. When we make changes, we will make the updated Terms available on the App and update the “Last Updated” date at the beginning of these Terms accordingly. Please check these Terms periodically for changes. Any changes to the Terms will apply on the date that they are made, and your continued access to or use of the App after the Terms have been updated will constitute your binding acceptance of the updates.  If you do not agree to any revised Terms, you may not access or use the App.
</div>
                </div>

                <div>
                    <div style={styles.title}>12. Children</div>
                    <div style={styles.text}>
                        Our <Link to="/privacy" style={styles.link}>Privacy Policy</Link> describes the ways we collect, use, store and disclose your personal information, and is hereby incorporated by this reference into these Terms. You agree to the collection, use, storage, and disclosure of your data in accordance with our Privacy Policy</div>
                </div>
                <div>
                    <div style={styles.title}>13. Privacy Policy</div>
                    <div style={styles.text}>
                        You may terminate these Terms at any time by canceling your account on the App and discontinuing your access to and use of the App. You will not receive any refunds if you cancel your account, or otherwise terminate these Terms. You agree that we, in our sole discretion and for any or no reason, may terminate these Terms and suspend and/or terminate your account(s) for the App. You agree that any suspension or termination of your access to the App may be without prior notice, and that we will not be liable to you or to any third party for any such suspension or termination. If we terminate these Terms or suspend or terminate your access to or use of the App due to your breach of these Terms or any suspected fraudulent, abusive, or illegal activity, then termination of these Terms will be in addition to any other remedies we may have at law or in equity. Upon any termination or expiration of these Terms, whether by you or us, you may no longer have access to information that you have posted on the App or that is related to your account, and you acknowledge that we will have no obligation to maintain any such information in our databases or to forward any such information to you or to any third party. Sections 2.C and 3 through 15 will survive the termination or expiration of these Terms for any reason. </div>
                </div>
                <div>
                    <div style={styles.title}>14. Dispute Resolution; Arbitration</div>
                    <div style={styles.text}>
                        Please read this Section 14 carefully. It requires you to arbitrate disputes with Eth2Phone, and limits the manner in which you can seek relief from us.
<br />
                        <br />
                        All disputes arising out of or in connection with these Terms, including without limitation your access or use of the App, the Site, or the Smart Contracts, or to any products sold or distributed through the App, the Site, or the Smart Contracts, will be referred to and finally resolved by arbitration under the rules of the New York International Commercial Arbitration Centre. The appointing authority will be the New York International Commercial Arbitration Centre. The case will be adjudicated by a single arbitrator and will be administered by the New York International Commercial Arbitration Centre in accordance with its applicable rules. Each party will cover its own fees and costs associated with the arbitration proceedings. The place of arbitration will be New York, State of New York, USA. You may choose to have the arbitration conducted by telephone, based on written submissions. The language of the arbitration will be English. The award of the arbitrator will be final and binding, and any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction. Notwithstanding the foregoing, Eth2Phone may seek and obtain injunctive relief in any jurisdiction in any court of competent jurisdiction, and you agree that these Terms are specifically enforceable by Eth2Phone through injunctive relief and other equitable remedies without proof of monetary damages.
<br />
                        <br />
                        WITH RESPECT TO ANY DISPUTE ARISING OUT OF OR RELATED TO THESE TERMS, INCLUDING WITHOUT LIMITATION DISPUTES RELATED TO THE APP, THE SITE, THE SMART CONTRACTS, OR ANY PRODUCTS SOLD OR DISTRIBUTED THROUGH THE APP, THE SITE, OR THE SMART CONTRACTS: (1) YOU HEREBY EXPRESSLY GIVE UP YOUR RIGHT TO HAVE A TRIAL BY JURY; AND (2) YOU HEREBY EXPRESSLY GIVE UP YOUR RIGHT TO PARTICIPATE AS A MEMBER OF A CLASS OF CLAIMANTS IN ANY LAWSUIT, INCLUDING BUT NOT LIMITED TO CLASS ACTION LAWSUITS INVOLVING ANY SUCH DISPUTE.
                                      </div>
                </div>
                <div>
                    <div style={styles.title}>15. General</div>
                    <div style={styles.text}>
                        These Terms constitute the entire legal agreement between you and Eth2Phone, govern your access to and use of the App, and completely replace any prior or contemporaneous agreements between the parties related to your access to or use of the App, whether oral or written. There are no third party beneficiaries to these Terms. The parties are independent contractors, and nothing in these Terms create any agency, partnership, or joint venture. The language in these Terms will be interpreted as to its fair meaning, and not strictly for or against any party. You may not assign any or your rights or obligations under these Terms, whether by operation of law or otherwise, without our prior written consent. We may assign our rights and obligations under these Terms in our sole discretion to an affiliate, or in connection with an acquisition, sale or merger. Should any part of these Terms be held invalid or unenforceable, that portion shall be construed consistent with applicable law and the remaining portions will remain in full force and effect. Our failure to enforce any provision of these Terms will not be deemed a waiver of such provision, nor of the right to enforce such provision. These Terms will be governed by and construed in accordance with the laws of the province of the USA and the federal laws of the USA applicable therein, excluding its conflicts of law rules and principles. Subject to Section 14, any legal action or proceeding arising under these Terms will be brought exclusively in the federal or provincial courts located in New York, State of New York, USA, and the parties irrevocably consent to the personal jurisdiction and venue there. We will not be liable for any failure or delayed performance of our obligations that result from any condition beyond our reasonable control, including, but not limited to, governmental action, acts of terrorism, earthquake, fire, flood, acts of God, labor conditions, power failures, Internet disturbances, or acts or omissions of third parties. You agree that we may provide you with notices (including, without limitation those regarding changes to these Terms) by email, regular mail, or postings on the App. By providing us with your email address, you consent to our using the email address to send you any notices required by law in lieu of communication by postal mail.
                </div>
                </div>
            </div>
        )
    }
}


export default Terms;