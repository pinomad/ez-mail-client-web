import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { addProperties, removeProperties } from '../../utils/dragAndDrop';
import LeftNav from '../../components/emailEditingStep03/LeftNav';
import ContentMovePanel from '../../components/emailEditingStep03/ContentMovePanel';
import ContentWrapper from '../../components/emailEditingStep03/contentWrapper';
import { dataToComponent } from '../../utils/emailEditing';
import FooterContent from '../../components/emailEditingStep03/FooterContent';
import ContentStyleTool from '../../components/emailEditingStep03/ContentStyleTool';

const emailTemplateData = {
  emailBodyStyle: { backgroundColor: '#f5f5f5' },
  emailContainerStyle: {
    backgroundColor: 'white',
    borderWidth: '0px',
    borderColor: 'black',
    borderStyle: 'solid',
  },
  emailContents: [
    {
      id: 'asdf1',
      type: 'spacer',
      boxStyle: {
        backgroundColor: 'green',
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
        height: '50px',
      },
    },
    {
      id: 'asdf2',
      type: 'divider',
      boxStyle: {
        backgroundColor: 'yellow',
        borderWidth: '0px',
        borderColor: 'black',
        borderStyle: 'solid',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      contentStyle: {
        height: '1px',
        borderTopWidth: '3px',
        borderTopColor: 'black',
        borderTopStyle: 'solid',
      },
    },
    {
      id: 'asdf3',
      type: 'image',
      link: 'https://beta.reactjs.org/',
      imageSrc:
        'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      boxStyle: {
        backgroundColor: 'yellow',
        borderWidth: '0px',
        borderColor: 'black',
        borderStyle: 'solid',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '0px',
        paddingRight: '0px',
        textAlign: 'center',
      },
      contentStyle: {
        maxWidth: '100%',
        width: '',
      },
    },
    {
      id: 'asdf4',
      type: 'spacer',
      boxStyle: {
        height: '20px',
        backgroundColor: 'transparent',
        borderWidth: '0px',
        borderColor: 'black',
        borderStyle: 'solid',
      },
    },
    {
      id: 'text123',
      type: 'text',
      content: '뿡빵뿡빵',
      boxStyle: {
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '0px',
        paddingRight: '0px',
        textAlign: 'center',
      },
      contentStyle: {
        fontSize: '24px',
        fontFamily:
          'AppleSDGothic, "apple sd gothic neo", "noto sans korean", "noto sans korean regular", "noto sans cjk kr", "noto sans cjk", "nanum gothic", "malgun gothic", dotum, arial, helvetica, sans-serif',
      },
    },
    {
      id: 'asdf5',
      type: 'button',
      link: 'https://beta.reactjs.org/',
      content: '길지 버튼',
      boxStyle: {
        backgroundColor: 'orange',
        borderWidth: '1px',
        borderColor: 'black',
        borderStyle: 'solid',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingLeft: '15px',
        paddingRight: '15px',
        textAlign: 'center',
      },
      contentStyle: {
        display: 'inline-block',
        backgroundColor: '#ffdf2b',
        borderWidth: '0px',
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: '3px',
        padding: '16px 18px',
        color: '#000000',
        fontSize: '16px',
        fontFamily:
          'AppleSDGothic, "apple sd gothic neo", "noto sans korean", "noto sans korean regular", "noto sans cjk kr", "noto sans cjk", "nanum gothic", "malgun gothic", dotum, arial, helvetica, sans-serif',
      },
    },
  ],
};

export default function EmailEditingStep03() {
  const [emailContentsData, setEmailContentsData] = useState([]);
  const $dragItemRef = useRef();
  const $dragOverItemRef = useRef();
  const $dragItemIndexRef = useRef();
  const $dragOverItemIndexRef = useRef();
  const [focusedType, setFocusedType] = useState(null);

  useEffect(() => {
    setEmailContentsData(addProperties(emailTemplateData.emailContents));
  }, []);

  const handleDraggable = e => {
    const targetId = e.currentTarget.parentNode.parentNode.id;
    const newEmailContents = emailContentsData.map(item => {
      if (item.id === targetId) {
        return { ...item, isDraggable: true };
      }

      return item;
    });

    setEmailContentsData(newEmailContents);
  };

  const handleFocus = e => {
    const newEmailContents = emailContentsData.map(item => {
      if (item.id === e.target.id) {
        setFocusedType(item.type);

        return { ...item, isActive: true };
      }

      return item;
    });

    setEmailContentsData(newEmailContents);
  };

  const handleBlur = e => {
    const newEmailContents = emailContentsData.map(item => {
      return { ...item, isActive: false };
    });

    setFocusedType(null);
    setEmailContentsData(newEmailContents);
  };

  const handleDragStart = (e, index) => {
    $dragItemIndexRef.current = index;
    $dragItemRef.current = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    const img = new Image();

    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragEnter = (e, index) => {
    $dragOverItemIndexRef.current = index;
    $dragOverItemRef.current = e.currentTarget;
  };

  const handleDragEnd = e => {
    const newEmailContents = emailContentsData.map(item => {
      return { ...item, isDraggable: false };
    });

    setEmailContentsData(newEmailContents);
  };

  const handleDrop = (e, index) => {
    const newEmailContents = [...emailContentsData];
    const rect = e.currentTarget.getBoundingClientRect();
    const contentHeight = e.currentTarget.offsetHeight / 2;
    const middleOfContent = rect.top + contentHeight;
    const absolute = Math.abs(
      $dragItemIndexRef.current - $dragOverItemIndexRef.current,
    );

    if (e.dataTransfer.effectAllowed === 'move') {
      if (
        (absolute === 1 &&
          e.clientY > middleOfContent &&
          $dragItemIndexRef.current > $dragOverItemIndexRef.current) ||
        (absolute === 1 &&
          e.clientY < middleOfContent &&
          $dragItemIndexRef.current < $dragOverItemIndexRef.current)
      ) {
        // 의미없는 이동 시도
        return;
      }

      if (
        e.clientY < middleOfContent &&
        $dragItemIndexRef.current < $dragOverItemIndexRef.current &&
        absolute > 1
      ) {
        // 위에서 아래로 2칸이상 이동, 컨텐츠 위쪽으로 넣을때
        const draggedItem = newEmailContents.splice(
          $dragItemIndexRef.current,
          1,
        )[0];

        newEmailContents.splice(
          $dragOverItemIndexRef.current - 1,
          0,
          draggedItem,
        );
      } else if (
        e.clientY > middleOfContent &&
        $dragItemIndexRef.current > $dragOverItemIndexRef.current &&
        absolute > 1
      ) {
        // 아래에서 위로 2칸이상 이동, 컨텐츠 아래쪽으로 넣을때
        const draggedItem = newEmailContents.splice(
          $dragItemIndexRef.current,
          1,
        )[0];

        newEmailContents.splice(
          $dragOverItemIndexRef.current + 1,
          0,
          draggedItem,
        );
      } else {
        const draggedItem = newEmailContents.splice(
          $dragItemIndexRef.current,
          1,
        )[0];

        newEmailContents.splice($dragOverItemIndexRef.current, 0, draggedItem);
      }
    } else {
      const newContent = JSON.parse(e.dataTransfer.getData('content'));

      if (e.clientY > middleOfContent) {
        newEmailContents.splice(index + 1, 0, newContent);
      } else {
        newEmailContents.splice(index, 0, newContent);
      }
    }

    $dragItemIndexRef.current = null;
    $dragOverItemIndexRef.current = null;
    $dragOverItemRef.current.style.boxShadow = 'none';

    setEmailContentsData(newEmailContents);
  };

  const handleDragOver = e => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const contentHeight = e.currentTarget.offsetHeight / 2;
    const middleOfContent = rect.top + contentHeight;

    if (e.clientY > middleOfContent) {
      $dragOverItemRef.current.style.boxShadow = '0 2px orange';
    } else {
      $dragOverItemRef.current.style.boxShadow = '0 -2px orange';
    }
  };

  const handleDragLeave = e => {
    e.currentTarget.style.boxShadow = 'none';
    e.target.style.boxShadow = 'none';
  };

  const handleCopy = (e, index, element) => {
    const newEmailContents = [...emailContentsData];
    const newContent = { ...element };

    newContent.id = crypto.randomUUID();
    newContent.isActive = false;

    newEmailContents.splice(index, 0, newContent);

    setEmailContentsData(newEmailContents);
  };

  const handleDelete = (e, element) => {
    const newEmailContents = emailContentsData.filter(
      item => item.id !== element.id,
    );

    setEmailContentsData(newEmailContents);
  };

  const contents = emailContentsData.map((emailContentData, index) => {
    return (
      <ContentWrapper
        key={emailContentData.id}
        id={emailContentData.id}
        isDraggable={emailContentData.isDraggable}
        onDragStart={e => handleDragStart(e, index)}
        onDragEnter={e => handleDragEnter(e, index)}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragLeave}
        onDrop={e => handleDrop(e, index)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onDelete={e => handleDelete(e, emailContentData)}
      >
        {dataToComponent(emailContentData)}
        {emailContentData.isActive && (
          <ContentMovePanel
            onDraggable={handleDraggable}
            onCopy={e => handleCopy(e, index, emailContentData)}
            onDelete={e => handleDelete(e, emailContentData)}
          />
        )}
      </ContentWrapper>
    );
  });

  return (
    <>
      <SubNav>
        <Step>구독자</Step>
        <StyledFaAngleRight icon={faAngleRight} />
        <Step>발송정보</Step>
        <StyledFaAngleRight icon={faAngleRight} />
        <Step>콘텐츠</Step>
      </SubNav>
      <Background>
        {focusedType ? <ContentStyleTool type={focusedType} /> : <LeftNav />}
        <EmailBackground style={emailTemplateData.emailBodyStyle}>
          <EmailContentsList style={emailTemplateData.emailContainerStyle}>
            {contents}
            <FooterContent />
          </EmailContentsList>
        </EmailBackground>
        {/* <EmailBodyTable>
          <SpaceContent />
          {dataToComponent(data[0])}
          <SpaceContent />
        </EmailBodyTable> */}
      </Background>
    </>
  );
}

const SubNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 50px;
  border-bottom: 1px solid #dfe0e4;
  text-align: center;
  color: #bdbdbd;
`;

const Step = styled.span`
  flex: 2;
  &:nth-child(5) {
    font-weight: 500;
    color: black;
  }
`;

const StyledFaAngleRight = styled(FontAwesomeIcon)`
  font-size: 20px;
  flex: 0.5;
`;

const Background = styled.div`
  display: flex;
  height: calc(100vh - 145.5px);
`;

const EmailBackground = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 630px;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

const EmailContentsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 630px;
  min-width: 630px;
  height: max-content;
  margin: 30px 0;
  background-color: white;
`;
