import React from 'react';
import { Button, Anchor } from 'antd';
import gdpr from '../../../assets/files/swn-privacy-policy.pdf';
import './GDPR.css';

const { Link } = Anchor;

const GDPR = props => {
    return (
        <>
            <Anchor targetOffset={100} style={{backgroundColor: 'transparent', paddingLeft: '10px', position: 'fixed', top: '100px'}}>
                <Link href="#intro" title="A." />
                <Link href="#credit" title="B." />
                <Link href="#personal-data" title="C."/>
                <Link href="#data-usage" title="D." />
                <Link href="#disclosing" title="E." />
                <Link href="#data-transfers" title="F." />
                <Link href="#retain-info" title="G." />
                <Link href="#security" title="H." />
                <Link href="#amendments" title="I." />
                <Link href="#your-rights" title="J." />
                <Link href="#third-party" title="K." />
                <Link href="#updating-info" title="L." />
            </Anchor>
            <div className="GDPR">
                <h1 style={{textAlign: 'center'}}>Privacy policy</h1>
                <h3 id='intro'>A. Introduction</h3>
                <p style={{paddingLeft: '20px'}}>
                    1. The privacy of our website visitors is very important to us, and we are
                    committed to safeguarding it. This policy explains what we do with your
                    personal information. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. Consenting to our use of cookies in accordance with the terms of this policy
                    when you first visit our website permits us to use cookies every time you visit
                    our website. 
                </p>

                <h3 id='credit'>B. Credit</h3>
                <p style={{paddingLeft: '20px'}}>
                    1. This document was created using a template from SEQ Legal
                    (seqlegal.com) and modified by vpnMentor (www.vpnmentor.com)
                </p>

                <h3 id='personal-data'>C. How we collect your personal data?</h3>
                <p>The following types of personal information may be collected, stored, and used:</p>
                <p style={{paddingLeft: '20px'}}>
                    1. Information about your computer including your IP address, geographical
                    location, browser type and version, and operating system
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. Information about your visits to and use of this website including the
                    referral source, length of visit, page views, and website navigation paths. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    3. Information that you enter when you register with our website, such as
                    your email website.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    4. Information that you enter when you create a profile on our website. For
                    example, your name, profile pictures, gender, birthday, relationship
                    status, in
                </p>
                <p style={{paddingLeft: '20px'}}>
                    5. Information that you enter in order to set up subscription to our emails
                    and/or newsletters.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    6. Information that is generated while using our website, including when,
                    how often, and under what circumstances you use it. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    7. Information relating to anything you purchase, services you use, or
                    transaction you make through our website, which includes your name,
                    address, telephone number, email address, and credit card details.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    8. Information that you post to our website with the intention of publishing
                    it on the internet. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    9. Any other personal information you send to us. 
                </p>

                <h3 id='data-usage'>D. Using Personal Information</h3>
                <p>
                    Personal information submitted to us through our website will be used for the
                    purposes specified in this policy or on the relevant pages of the website. We may
                    use your personal information for the following:
                </p>
                <p style={{paddingLeft: '20px'}}>
                    1. Administering our website and business
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. Personalizing our website for you
                </p>
                <p style={{paddingLeft: '20px'}}>
                    3. Enabling your use of the services available on our website
                </p>
                <p style={{paddingLeft: '20px'}}>
                    4. Sending you goods purchased through our website
                </p>
                <p style={{paddingLeft: '20px'}}>
                    5. Supplying services purchased through our website
                </p>
                <p style={{paddingLeft: '20px'}}>
                    6. Sending statements, invoices, and payment reminders to you, and
                    collecting payments from you. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    7. Sending you on-marketing commercial communications
                </p>
                <p style={{paddingLeft: '20px'}}>
                    8. Sending you email notifications you have specifically requested. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    9. Sending you our email newsletter if you signed up for it (you can
                    unsubscribe at any time).
                </p>
                <p style={{paddingLeft: '20px'}}>
                    10. Sending you marketing communications relating to our business or the
                    businesses of third parties which we think may be of interest to you. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    11. Providing third parties with statistical information about our users.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    12. Dealing with inquiries and complaints made by or about you relating to
                    our website
                </p>
                <p style={{paddingLeft: '20px'}}>
                    13.Keeping our website secure and prevent fraud. 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    14.Verifying compliance with the terms and conditions governing the use of
                    our website.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    15. Other uses. 
                </p>
                <p>
                    If you submit personal information for publication on our website, we will publish
                    and otherwise use that information in accordance with the license you grant us.
                    Your privacy settings can be used to limit the publication of your information on our
                    website and can be adjusted using privacy controls on the website.
                    We will not, without your expressed consent, supply your personal information to
                    any third party for their or any other third party’s direct marketing. 
                </p>

                <h3 id='disclosing'>E. Disclosing personal information</h3>
                <p>
                    We may disclose your personal information to any of our employees, officers,
                    insurers, professional advisers, agents, suppliers, or subcontractors as reasonably
                    necessary for the purposes set out in this policy.
                    We may disclose your personal information to any member of our group of
                    companies (this means our subsidiaries, our ultimate holding company and all its
                    subsidiaries) as reasonably necessary for the purposes set out in this policy.
                    We may disclose your personal information:
                </p>
                <p style={{paddingLeft: '20px'}}>
                    1. to the extent that we are required to do so by law;
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. in connection with any ongoing or prospective legal proceedings;
                </p>
                <p style={{paddingLeft: '20px'}}>
                    3. in order to establish, exercise, or defend our legal rights (including providing
                    information to others for the purposes of fraud prevention and reducing
                    credit risk); 
                </p>
                <p style={{paddingLeft: '20px'}}>
                    4. to the purchaser (or prospective purchaser) of any business or asset that we
                    are (or are contemplating) selling; and
                </p>
                <p style={{paddingLeft: '20px'}}>
                    5. to any person who we reasonably believe may apply to a court or other
                    competent authority for disclosure of that personal information where, in our
                    reasonable opinion, such court or authority would be reasonably likely to
                    order disclosure of that personal information. 
                </p>
                <p>
                    Except as provided in this policy, we will not provide your personal information to
                    third parties.
                </p>

                <h3 id='data-transfers'>F. International data transfers</h3>
                <p style={{paddingLeft: '20px'}}>
                    1. Information that we collect may be stored, processed in, and transferred
                    between any of the countries in which we operate in order to enable us to
                    use the information in accordance with this policy.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. Information that we collect may be transferred to the following countries
                    which do not have data protection laws equivalent to those in force in the
                    European Economic Area: the United States of America, Russia, Japan,
                    China, and India.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    3. Personal information that you publish on our website or submit for
                    publication on our website may be available, via the internet, around the
                    world. We cannot prevent the use or misuse of such information by others.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    4. You expressly agree to the transfers of personal information described in
                    this Section F.
                </p>

                <h3 id='retain-info'>G. Retaining personal information</h3>
                <p style={{paddingLeft: '20px'}}>
                    1. This Section G sets out our data retention policies and procedure, which are
                    designed to help ensure that we comply with our legal obligations regarding
                    the retention and deletion of personal information.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. Personal information that we process for any purpose or purposes shall not
                    be kept for longer than is necessary for that purpose or those purposes.
                </p>
                <p style={{paddingLeft: '20px', marginBottom: 0}}>
                    3. Without prejudice to article G-2, we will usually delete personal data falling
                    within the categories set out below at the date/time set out below:
                </p>
                <p style={{paddingLeft: '40px'}}>
                    a. personal data type will be deleted 00:00:00 EEST; and
                </p>
                <p style={{paddingLeft: '20px', marginBottom: 0}}>
                    4. Notwithstanding the other provisions of this Section G, we will retain
                    documents (including electronic documents) containing personal data:
                </p>
                <p style={{paddingLeft: '40px', marginBottom: 0}}>
                    a. to the extent that we are required to do so by law;
                </p>
                <p style={{paddingLeft: '40px', marginBottom: 0}}>
                    b. if we believe that the documents may be relevant to any ongoing or
                    prospective legal proceedings; and
                </p>
                <p style={{paddingLeft: '40px'}}>
                    c. in order to establish, exercise, or defend our legal rights (including
                    providing information to others for the purposes of fraud prevention
                    and reducing credit risk).
                </p>

                <h3 id='security'>H. Security of your personal information</h3>
                <p style={{paddingLeft: '20px'}}>
                    1. We will take reasonable technical and organizational precautions to prevent
                    the loss, misuse, or alteration of your personal information.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    2. We will store all the personal information you provide on our secure
                    (password- and firewall-protected) servers.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    3. All electronic financial transactions entered into through our website will be
                    protected by encryption technology.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    4. You acknowledge that the transmission of information over the internet is
                    inherently insecure, and we cannot guarantee the security of data sent over
                    the internet.
                </p>
                <p style={{paddingLeft: '20px'}}>
                    5. You are responsible for keeping the password you use for accessing our
                    website confidential; we will not ask you for your password (except when
                    you log in to our website).
                </p>

                <h3 id='amendments'>I. Amendments</h3>
                <p>
                    We may update this policy from time to time by publishing a new version on our
                    website. You should check this page occasionally to ensure you understand any
                    changes to this policy. We may notify you of changes to this policy by email or
                    through the private messaging system on our website.
                </p>

                <h3 id='your-rights'>J. Your rights</h3>
                <p>
                    You may instruct us to provide you with any personal information we hold about
                    you; provision of such information will be subject to the following:
                </p>
                <p>
                    We may withhold personal information that you request to the extent permitted by
                    law.
                </p>
                <p>
                    You may instruct us at any time not to process your personal information for
                    marketing purposes.
                </p>
                <p>
                    In practice, you will usually either expressly agree in advance to our use of your
                    personal information for marketing purposes, or we will provide you with an
                    opportunity to opt out of the use of your personal information for marketing
                    purposes.
                </p>

                <h3 id='third-party'>K. Third party websites</h3>
                <p>
                    Our website includes hyperlinks to, and details of, third party websites. We have no
                    control over, and are not responsible for, the privacy policies and practices of third
                    parties.
                </p>

                <h3 id='updating-info'>L. Updating information</h3>
                <p>
                    Please let us know if the personal information that we hold about you needs to be
                    corrected or updated.
                </p>
                    <Button className="DownloadGDPR" href={gdpr} target='_blank'>Download Pdf</Button>
            </div>
        </>
    )
}

export default GDPR;