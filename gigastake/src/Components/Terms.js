import React from 'react';

const Terms = () => {
    return (
        <div className="termsAndConditionsDiv">
            <h2 className="termsAndConditionsDivBolder" style={{textAlign: "center"}}>Terms and conditions</h2>
          <span className="termsAndConditionsDivBolder">1. Overview </span>  <br></br>
          1.1 Giga Stake is a staking platform that allows users to stake tokens in order to receive rewards from the rewards pool.
<br></br>
1.2 The staking duration and rewards allocation are determined based on various factors, including the number of tokens staked, the duration of the stake, the total rewards pool amount, and the tokens staked by other users.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">2. Staking Requirements</span><br></br>
2.1 Minimum Stake Amount: The minimum amount of tokens that can be staked is 1.
<br></br>
2.2 Maximum Stake Amount: The maximum amount of tokens that can be staked is 99999999999999999.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">3. Rewards Pool</span><br></br>
3.1 Adding Rewards: Authorized managers, delegated by the contract owner, may add rewards to the rewards pool for users to stake. Once rewards are added, they become available for stakers and cannot be reclaimed by the authorized managers.
<br></br>
3.2 Minimum Rewards Amount: The minimum amount of tokens that can be added as rewards is 1.
<br></br>
3.3 Maximum Rewards Amount: The maximum amount of tokens that can be added as rewards is 99999999999999999.
<br></br>
3.4 Rewards Tax: A 1% tax is applied when authorized managers add rewards to the rewards pool.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">4. Staking Duration</span><br></br>
4.1 Minimum Duration: The minimum duration an authorized manager can make rewards available is 300 seconds.
<br></br>
4.2 Maximum Duration: The maximum duration an authorized manager can make rewards available is 99999999 seconds.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">5. Rewards Disbursement</span><br></br>
5.1 Proportional Rewards: The rewards received by stakers are distributed proportionally based on the number of tokens staked, the stake duration, the total tokens in the rewards pool, and the tokens staked by other users.
<br></br>
5.2 Increased Rewards: Staking a higher proportion of tokens or staking for a longer duration may result in higher rewards.
<br></br>
5.3 Rewards Tax: A 1% tax is applied to the rewards amount when any user claims rewards. Users receive 100% of their staked funds back.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">6. Rewards Claiming</span><br></br>
6.1 Time Limit: Stakers should claim their rewards within 72 days from the end of the staking duration.
<br></br>
6.2 Staked Funds Availability: Staked funds will remain accessible even after the 72-day period; however, unclaimed rewards will expire after this period.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">7. Authorized Managers</span><br></br>
7.1 Delegation of Managers: The contract owner may delegate other users as authorized managers to add rewards for their own tokens and allow users to stake them.
<br></br>
7.2 Rewards Ownership: Authorized managers understand that once rewards are added to the rewards pool, they become available for stakers and cannot be retrieved by the authorized managers.
<br></br>
7.3 Rewards Tax: A 1% tax is applied when authorized managers add rewards to the rewards pool.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">8. User Obligations</span><br></br>
8.1 Compliance: Users agree to comply with all applicable laws, regulations, and guidelines while using the Platform.
<br></br>
8.2 Accurate Information: Users must provide accurate and up-to-date information during the registration process and ensure that their staking activities are conducted honestly and transparently.
<br></br>
8.3 Prohibited Activities: Users are prohibited from engaging in any fraudulent, unlawful, or harmful activities that may compromise the integrity and security of the Platform.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">9. Limitation of Liability</span><br></br>
9.1 Use at Own Risk: The Platform is provided on an "as-is" and "as available" basis. Giga Stake does not guarantee the accuracy, reliability, or availability of the Platform.
<br></br>
9.2 No Liability for Losses: Giga Stake, its owners, employees, or authorized managers shall not be held liable for any losses, damages, or expenses incurred by users due to the use of the Platform.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">10. Amendments</span>
<br></br>
10.1 Modification of Agreement: Giga Stake reserves the right to modify or amend this Agreement at any time. Users will be notified of any changes via the Platform or through other means of communication deemed appropriate by Giga Stake. Continued use of the Platform after the modifications will constitute acceptance of the revised Agreement.
<br></br><br></br>
<span className="termsAndConditionsDivBolder">11. Governing Law and Jurisdiction</span>
<br></br>
11.1 Applicable Law: This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction].
<br></br>
11.2 Dispute Resolution: Any disputes arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the rules of [Arbitration Organization].
<br></br><br></br>
By accessing and using the Giga Stake Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of this Agreement, please refrain from using the Platform.
        </div>
    );
};

export default Terms;