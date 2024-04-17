/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Space, Button, Divider, Flex } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, InboxOutlined, DeleteOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

import { useDropzone } from 'react-dropzone';

export const Write = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [boardProp, setBoardProp] = useState(null); // 타겟 타이틀 명
    const [flagProp, setFlagProp] = useState(null); // 타겟 게시판 명
    const [titleProp, setTitleProp] = useState(null); // 타겟 게시판 타이틀
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);

    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너
    const [command, setCommand] = useState('false'); // 파일 업로드 여부
    const [uploadedFiles, setuploadedFiles] = useState([]); // 파일
    const [selectedFile, setselectedFile] = useState([]);

    //=================================================================
    // 파일 업로드 Start
    const handleDrop = (acceptedFiles) => {
        const remainingSlots = 10 - uploadedFiles.length;
        const filesToUpload = acceptedFiles.slice(0, remainingSlots);
        filesToUpload.forEach((file) => {
            // 파일 정보 및 base64 변환
            const reader = new FileReader();
            reader.onload = () => {
                const uploadedFile = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    base64Image: reader.result,
                    localPath: file.path
                };
                // 업로드된 이미지 추가
                setuploadedFiles((prevImages) => [...prevImages, uploadedFile]);
            };
            reader.readAsDataURL(file);
        });
        setselectedFile(filesToUpload);
        setCommand('true');
    };
    const {
        getRootProps: getRootProps,
        getInputProps: getInputProps,
        isDragActive: isDragActive
    } = useDropzone({
        onDrop: handleDrop
    });

    // 이미지 삭제
    const handleImageDelete = (index) => {
        const updatedFiles = [...uploadedFiles];
        updatedFiles.splice(index, 1);
        setuploadedFiles(updatedFiles);
    };
    // 이미지 업로드 End
    //=================================================================

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const editor_onChange = (html) => {
        // props.editor_onChange(html);
        console.log(html);
    };

    const handleResize = () => {
        setHeightSize(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(timerId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
        setFormProp(location.state.form);
    }, [location.state]);

    return (
        <>
            <MainCard
                title={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/',
                                    title: <HomeOutlined />
                                },
                                {
                                    title: boardProp
                                },
                                {
                                    title: titleProp
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>
            <Spin tip="Loading..." spinning={loading}>
                <Card title={formProp === 'Write' ? '등록' : '수정'} style={{ marginTop: '30px' }}>
                    <Row gutter={[16, 32]}>
                        <Col span={24} style={{ fontSize: '15px' }}>
                            <DatePicker placeholder="등록일" onChange={onChange} style={{ height: '55px', width: '100%' }} />
                        </Col>

                        <Col span={24} style={{ fontSize: '18px', fontWeight: '600' }}>
                            <Input
                                size="large"
                                placeholder="제목"
                                prefix={<EditOutlined />}
                                allowClear
                                enterButton="Search"
                                style={{ height: '55px' }}
                            />
                        </Col>
                        {flagProp === 'Picture' ? (
                            ''
                        ) : (
                            <>
                                <Col span={24} style={{ fontSize: '15px' }}>
                                    <Editor
                                        ref={editorRef}
                                        initialValue={' '}
                                        initialEditType="wysiwyg"
                                        hideModeSwitch={false}
                                        width="100%"
                                        height="450px"
                                        usageStatistics={false}
                                        useCommandShortcut={true}
                                        name="contents"
                                        onChange={() => editor_onChange(editorRef.current?.getInstance().getHTML())}
                                        plugins={[colorSyntax]}
                                        language="ko-KR"
                                    />
                                </Col>
                            </>
                        )}
                        <Col span={24} style={{ fontSize: '15px' }}>
                            <Button
                                block
                                {...getRootProps()}
                                className={`dropzone ${isDragActive ? 'active' : ''}`}
                                style={{ width: '100%', height: '150px' }}
                                size="large"
                                // disabled={uploadedFiles?.length >= 4}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined style={{ fontSize: '48px', color: '#1677ff' }} />
                                </p>
                                <input {...getInputProps()} type="file" />
                                {isDragActive ? (
                                    <>
                                        <p className="ant-upload-text" style={{ fontSize: '15px' }}>
                                            영역안에 드래그하세요!
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="ant-upload-text" style={{ fontSize: '15px' }}>
                                            업로드하려면 영역을 클릭하거나 드래그하세요!
                                        </p>
                                    </>
                                )}
                            </Button>
                            {uploadedFiles.length > 0 ? (
                                <>
                                    <Divider />
                                    <Space>
                                        <Row>
                                            {uploadedFiles?.map((File, index) => (
                                                <Col
                                                    span={24}
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'start',
                                                        alignItems: 'center',
                                                        borderRadius: '5px',
                                                        padding: '3px'
                                                    }}
                                                >
                                                    <Button
                                                        danger
                                                        name="Quest_answer"
                                                        type="primary"
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => handleImageDelete(index)}
                                                        style={{ marginRight: '6px' }}
                                                    >
                                                        삭제
                                                    </Button>
                                                    {File.name}
                                                </Col>
                                            ))}
                                        </Row>
                                    </Space>
                                </>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </Card>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
