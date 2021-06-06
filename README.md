# cdkeks
Higher-level cdk construct to build an eks kubernetes platform with batteries included:

- Network policies with [aws-calico](https://github.com/aws/eks-charts/tree/master/stable/aws-calico)
- DNS management with [external-dns](https://github.com/kubernetes-sigs/external-dns)
- Forwarding logs to CloudWatch Logs or ElasticSearch with [fluent-bit](https://github.com/aws/aws-for-fluent-bit)
- Ingress management with the [aws load balancer controller](https://github.com/kubernetes-sigs/aws-load-balancer-controller)

:warning: This is experimental and subject to breaking changes.

## Install
TypeScript/JavaScript:

```bash
npm install --save cdkeks
```

Python:

```bash
pip install cdkeks
```

## Howto use

### Addons

### Alb ingress

### LoadBalancer

## Example

See more complete [examples](https://github.com/hupe1980/cdkeks/tree/master/examples).

## License
[MIT](https://github.com/hupe1980/cdkeks/tree/master/cdkeks/LICENSE)