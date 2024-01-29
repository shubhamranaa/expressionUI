import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const ExpressionEngine = () => {
  const [combinator, setCombinator] = useState("and");
  const [rules, setRules] = useState([
    { ruleType: "Age", operator: ">", value: "", score: "" },
  ]);

  const handleCombinatorChange = (e) => {
    setCombinator(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    const updatedExpressions = [...rules];
    updatedExpressions[index][field] = value;
    setRules(updatedExpressions);
  };

  const addExpression = () => {
    setRules([
      ...rules,
      { ruleType: "age", operator: ">", value: "", score: "" },
    ]);
  };

  const deleteExpression = (index) => {
    const updatedExpressions = [...rules];
    updatedExpressions.splice(index, 1);
    setRules(updatedExpressions);
  };

  const handleSubmit = () => {
    const payload = {
      rules: rules.map((rule) => ({
        key: rule.ruleType,
        output: {
          value: parseFloat(rule.value),
          operator: rule.operator,
          score: parseFloat(rule.score),
        },
      })),
      combinator: combinator
    };
    console.log(payload);
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="connectorType">
          <Form.Label>Connector Type</Form.Label>
          <Form.Control
            as="select"
            value={combinator}
            onChange={handleCombinatorChange}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>

        {rules.map((expression, index) => (
          <Row className="align-items-center mt-3" key={index}>
            <Col>
              <Form.Group controlId={`ruleType${index}`}>
                <Form.Label>Rule Type</Form.Label>
                <Form.Control
                  as="select"
                  value={expression.ruleType}
                  onChange={(e) =>
                    handleExpressionChange(index, "ruleType", e.target.value)
                  }
                >
                  <option value="age">Age</option>
                  <option value="credit_score">Credit Score</option>
                  <option value="account_balance">Account Balance</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`operator${index}`}>
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  as="select"
                  value={expression.operator}
                  onChange={(e) =>
                    handleExpressionChange(index, "operator", e.target.value)
                  }
                >
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value="≥">{"≥"}</option>
                  <option value="≤">{"≤"}</option>
                  <option value="=">{"="}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`value${index}`}>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  value={expression.value}
                  onChange={(e) =>
                    handleExpressionChange(index, "value", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`score${index}`}>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="text"
                  value={expression.score}
                  onChange={(e) =>
                    handleExpressionChange(index, "score", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Button className="mt-4" variant="danger" onClick={() => deleteExpression(index)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))}

        <Button className="mt-3" variant="primary" onClick={addExpression}>
          Add Expression
        </Button>
        <br />
        <br />
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ExpressionEngine;
