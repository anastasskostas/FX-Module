import React from "react";
import Draft from "draft-js";
import "./rich.css";
import { getLengthOfSelectedText } from "../../../utils/draft";

const { Editor, RichUtils } = Draft;
const MAX_LENGTH = 160;

export default class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: props.editorState };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState }, () => this.props.updateEditorState(editorState));
    }
    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    toggleInlineStyle = (inlineStyle) => {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }

    handleBeforeInput = () => {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = getLengthOfSelectedText(editorState);

        if (currentContentLength - selectedTextLength > MAX_LENGTH - 1) {
            console.log(`you can type max ${MAX_LENGTH} characters`);
            return 'handled';
        }
    }

    handlePastedText = (pastedText) => {
        const { editorState } = this.state;
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = getLengthOfSelectedText(editorState);

        if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
            console.log(`you can type max ${MAX_LENGTH} characters`);
            return 'handled';
        }
    }

    render() {
        const { editorState } = this.state;
        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = "RichEditor-editor";
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== "unstyled") {
                className += " RichEditor-hidePlaceholder";
            }
        }
        return (
            <div className="RichEditor-root">
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Add a note..."
                        ref="editor"
                        spellCheck={true}
                        handleBeforeInput={this.handleBeforeInput}
                        handlePastedText={this.handlePastedText}
                    />
                </div>
            </div>
        );
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }
    render() {
        return (
            <span className={`RichEditor-styleButton ${this.props.active && 'RichEditor-activeButton'}`} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

var INLINE_STYLES = [
    { label: <b>Bold</b>, style: "BOLD" },
    { label: <em>Italic</em>, style: "ITALIC" },
    { label: <ins>Underline</ins>, style: "UNDERLINE" },
];
const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type, index) => (
                <StyleButton
                    key={index}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};
