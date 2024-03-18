import { useEffect, useState, useRef } from 'react';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

export const Editor_Conteiner = (props) => {
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);

    // const [SelectNoticeApi] = useSelectNoticeMutation(); // hooks api호출 상세 호출
    // const handleCallView = async () => {
    //     const SelectNoticeApiRequest = await SelectNoticeApi({
    //         EidtorId: props.EidtorId
    //     });
    //     editorRef.current?.getInstance().setMarkdown(SelectNoticeApiRequest.data.RET_DATA.contents);
    // };

    const editor_onChange = (html) => {
        // props.editor_onChange(html);
        console.log(html);
    };

    const handleResize = () => {
        setHeightSize(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // props.EidtorId === null ? '' : handleCallView();
    }, []);

    return (
        <>
            <Editor
                ref={editorRef}
                initialValue={' '}
                initialEditType="wysiwyg"
                hideModeSwitch={false}
                width="100%"
                // height="550px"
                height={`${heightSize - 250}px`}
                usageStatistics={false}
                useCommandShortcut={true}
                name="contents"
                onChange={() => editor_onChange(editorRef.current?.getInstance().getHTML())}
                plugins={[colorSyntax]}
                language="ko-KR"
            />
        </>
    );
};
