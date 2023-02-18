import React from 'react';
import styled from 'styled-components';

import Modal from '../components/Modal';

const cdnData = `
<link rel="stylesheet" href="https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form_style.css">
<div id="stb_subscribe">
  
  <form action="https://stibee.com/api/v1.0/lists/hdLmF6VugnWfYX4J9AvLpINmxHJ3fw==/public/subscribers" method="POST" target="_blank" accept-charset="utf-8" class="stb_form" name="stb_subscribe_form" id="stb_subscribe_form" novalidate>
    
    <h1 class="stb_form_title">기본 주소록 구독하기</h1>
    
    
      <fieldset class="stb_form_set">
        <label for="stb_email" class="stb_form_set_label">
          이메일 주소<span class="stb_asterisk">*</span>
        </label>
        <input type="text" class="stb_form_set_input" id="stb_email" name="email" required="required">
        <div class="stb_form_msg_error" id="stb_email_error"></div>
      </fieldset>
    

    

    
      <div class="stb_form_policy">
        <label>
          <input type="checkbox" id="stb_policy" value="stb_policy_true">
          <span>(필수)</span>
          <button id="stb_form_modal_open" data-modal="stb_form_policy_modal" class="stb_form_modal_open_btn" type="button">개인정보 수집 및 이용</button>에 동의합니다.
        </label>
        <div class="stb_form_msg_error" id="stb_policy_error"></div>
        <div class="stb_form_modal stb_form_policy_text blind" id="stb_form_policy_modal">
          <div class="stb_form_modal_body">
            <h1 class="stb_form_modal_title">
              개인정보 수집 및 이용
            </h1>
            <p class="stb_form_modal_text">뉴스레터 발송을 위한 최소한의 개인정보를 수집하고 이용합니다.
수집된 정보는 발송 외 다른 목적으로 이용되지 않으며, 서비스가 종료되거나 구독을 해지할 경우 즉시 파기됩니다.</p>
            <div class="stb_form_modal_btn">
              <button id="stb_form_modal_close" class="stb_form_modal_close_btn" data-modal="stb_form_policy_modal" type="button">닫기</button>
            </div>
          </div>
          <div class="stb_form_modal_bg" id="stb_form_modal_bg"></div>
        </div>
      </div>

    
    <div class="stb_form_result" id="stb_form_result">
    </div>

         
      <fieldset class="stb_form_set_submit">
        <button type="submit" class="stb_form_submit_button" id="stb_form_submit_button"
          style="background-color: #FF6464; color: #FFFFFF;">구독하기</button>
      </fieldset>
    
    </form>
  </div>
</div>
<script type="text/javascript" src="https://s3.ap-northeast-2.amazonaws.com/resource.stibee.com/subscribe/stb_subscribe_form.js"></script>
`;

export default function CdnCodeModal() {
  return (
    <Modal title="아래 코드를 복사하여 홈페이지에 붙여넣으세요">
      <CdnContainer>{cdnData}</CdnContainer>
    </Modal>
  );
}

const CdnContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: #333333;
  color: white;
  overflow-x: auto;
  overflow-y: auto;
`;
